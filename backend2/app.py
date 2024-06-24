import time
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from google.oauth2 import service_account
from googleapiclient.discovery import build
from sklearn.ensemble import RandomForestClassifier
from threading import Thread
from database.db import userDB,cashbackDB
from flask_cors import CORS


app = Flask(__name__)

CORS(app)

userDB = userDB()
cashbackDB = cashbackDB()

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SPREADSHEET_ID = '1ixM-kgmvuIp7xgPLdO-JeBqr93vxwGYRfAjrQ4V5O6w'
RANGE_NAME = 'Sheet1!A1:F1000'
RANGE_NAME2 = 'Sheet1!A2:F1000'

creds = service_account.Credentials.from_service_account_file(
    './sheets.json', scopes=SCOPES
)

service = build('sheets', 'v4', credentials=creds)

last_row_fetched = 0
leftover_rows = []
category_mappers = {}
unique_counters = {}
ratings ={}
discount_ratings = {}

model = RandomForestClassifier(n_estimators=100, random_state=42)


def map_categories_to_int(df, cat_columns):
    global category_mappers, unique_counters

    mapped_df = df.copy()
    
    for col_idx in cat_columns:
        if col_idx not in category_mappers:
            category_mappers[col_idx] = {}
            unique_counters[col_idx] = 0
        
        col_name = df.columns[col_idx]
        categories = df.iloc[:, col_idx]
        mapped_values = []
        
        for cat in categories:
            if cat not in category_mappers[col_idx]:
                category_mappers[col_idx][cat] = unique_counters[col_idx]
                unique_counters[col_idx] += 1
            mapped_values.append(category_mappers[col_idx][cat])
        
        mapped_df[col_name] = mapped_values
    
    return mapped_df

def build_model(data):

    df = pd.DataFrame(data[:])

    numeric_cols = [0, 1]
    df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric)

    categorical_columns = [2]
    df = map_categories_to_int(df, categorical_columns)

    X = df.drop(columns=[5,3,4])
    y = df[5]

    global model
    model.fit(X, y)


def rank_methods(series, ascending=True):
    return series.rank(method='min', ascending=ascending).astype(int)

def calculate_max_discount(cashback_data, currentPurchaseAmount):
    global discount_ratings
    for method, offers in cashback_data.items():
        max_discount = 0
        for offer in offers:
            if currentPurchaseAmount >= offer['minPurchase']:
                discount = min((currentPurchaseAmount * offer['disc'] / 100), offer['maxDisc'])
                if discount > max_discount:
                    max_discount = discount
        discount_ratings[method.upper()] = max_discount
    return discount_ratings

def recommendation_engine(data,cashback):

    column_names = ["UserID", "purchaseAmount", "purchaseType", "paymentCompletionTime", "success", "method"]

    df = pd.DataFrame(data)
    df.columns = column_names

    df['UserID'] = df['UserID'].astype('int')
    df['purchaseAmount'] = df['purchaseAmount'].astype('int')
    df['paymentCompletionTime'] = df['paymentCompletionTime'].astype('int')
    df['success'] = df['success'].astype('int')


    method_multipliers = {
        'UPI': 2,
        'WALLET': 1,
        'CARD': 3,
        'net banking': 4
    }

    current_purchase_amount = 6000

    discount_ratings = calculate_max_discount(cashback, current_purchase_amount)


    global ratings

    all_methods = set(df['method'].unique())

    discount_methods = set(discount_ratings.keys())
    no_discount_methods = all_methods - discount_methods

    max_rank = len(discount_methods)+1
    for method in no_discount_methods:
        discount_ratings[method] = 0

    discount_series = pd.Series(discount_ratings)
    discount_series_ranked = rank_methods(discount_series, ascending=False)

    for method in no_discount_methods:
        discount_series_ranked[method] = max_rank

    df_successful = df[df['success'] == 1]
    total_transactions = df.groupby('method').size()
    successful_transactions = df_successful.groupby('method').size()
    reliability = (successful_transactions / total_transactions).fillna(0)
    success_rate = df_successful['method'].value_counts()
    avg_completion_time = df_successful.groupby('method')['paymentCompletionTime'].mean()
    avg_completion_time_weighted = {}
    for method, avg_time in avg_completion_time.items():
        if method in method_multipliers:
            avg_completion_time_weighted[method] = avg_time * method_multipliers[method]
        else:
            avg_completion_time_weighted[method] = avg_time 
    df_weighted = pd.DataFrame.from_dict(avg_completion_time_weighted, orient='index')
    df_weighted=df_weighted[0]

    ratings['most'] = rank_methods(success_rate, ascending=False)
    ratings['reliable']= rank_methods(reliability, ascending=False)
    ratings['discount']= discount_series_ranked
    ratings['fast']= rank_methods(avg_completion_time, ascending=True)
    ratings['easy']= rank_methods(df_weighted, ascending=True)

def fetch_and_print_new_rows(batch_size):
    global last_row_fetched, leftover_rows
    
    
    result = service.spreadsheets().values().get(
        spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME2).execute()
    values = result.get('values', [])
    
    
    if not values:
        print("No data found in the sheet.")
        return
    
    new_rows = values[last_row_fetched:]
    if not new_rows:
        print("No new rows added since the last check.")
        return
    
    all_new_rows = leftover_rows + new_rows

    cashback=cashbackDB.getCashBack()
    
    for i in range(0, len(all_new_rows) // batch_size):
        batch = all_new_rows[i * batch_size:(i + batch_size) * batch_size]
        build_model(batch)
        recommendation_engine(values,cashback)
    
    leftover_rows = all_new_rows[(len(all_new_rows) // batch_size) * batch_size:]
    last_row_fetched += len(new_rows)

def monitor_sheet(batch_size=3,interval=10):
    while True:
        fetch_and_print_new_rows(batch_size)
        print("Waiting for the next interval...")
        time.sleep(interval)

def recommend_payment_method(tags):

    global ratings
    tag1 =ratings[tags[0]]
    tag2 =ratings[tags[1]]
    score = tag1*tag2
    recommendationList = score.sort_values(ascending=True)
    return recommendationList.index.tolist()


@app.route('/payment', methods=['POST'])
def post_data():

    data = request.get_json()

    print(data)
    values =[
                [userDB.getUserID(data["email"])
                ,data["purchaseAmount"]
                ,data["purchaseType"]
                ,data["paymentCompletionTime"]
                ,data["success"]
                ,data["method"]
                ]
           ]
    
    body = {'values': values}

    userDB.addUserPayment(data["email"],data["purchaseAmount"],data["name"],data["purchaseType"],data["savings"])

    service.spreadsheets().values().append(
        spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME,
        valueInputOption='RAW', body=body).execute()
    
    return jsonify({'status': 'success'}), 200


@app.route('/tags', methods=['POST'])
def add_tag():
    data = request.get_json()
    userDB.addTags(data["email"],data["tags"])

    return jsonify({'status': 'success'}), 200 

@app.route('/tags/<string:email>', methods=['GET'])
def get_tag(email):
    tags = userDB.getTags(email)
    return jsonify({'status': 'success',"tags":tags}), 200 



@app.route('/method', methods=['POST'])
def predict():
    data = request.get_json()
    npArr = np.array(data["features"]).reshape(1, -1)

    email = npArr[0][0]
    tags = userDB.getTags(email)
    npArr[0][0] = userDB.getUserID(email)

    response={
        "recommended":{

        },
        "others":{

        }
    }

    global category_mappers
    recommendedList = recommend_payment_method(tags)

    df = pd.DataFrame(npArr)
    numeric_cols = [0,1]
    df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric)
    categorical_columns = [2]
    df = map_categories_to_int(df, categorical_columns)
    global model
    X = df.values.reshape(1, -1)
    prediction = model.predict(X)

    method1 = prediction[0]
    method2 = recommendedList[1] if recommendedList[0] == method1 else recommendedList[0]

    remainingMethods = [key for key in ["UPI","WALLET","CARD","net banking"] if key not in [method1,method2]]


    cashback = cashbackDB.getCashBack()
    

    response["recommended"][method1] ={
        "savings":discount_ratings[method1],
        "cashback":cashback.get(method1, []),
        "tags":{
        "most": 1 if ratings['most'][method1]==1 else 0,
        "easy": 1 if ratings['easy'][method1]==1 else 0,
        "fast": 1 if ratings['fast'][method1]==1 else 0,
        "discount": 1 if ratings['discount'][method1]==1 else 0,
        "reliable": 1 if ratings['reliable'][method1]==1 else 0
      }

    }

    response["recommended"][method2] ={
        "savings":discount_ratings[method2],
        "cashback":cashback.get(method2, []),
        "tags":{
        "most": 1 if ratings['most'][method2]==1 else 0,
        "easy": 1 if ratings['easy'][method2]==1 else 0,
        "fast": 1 if ratings['fast'][method2]==1 else 0,
        "discount": 1 if ratings['discount'][method2]==1 else 0,
        "reliable": 1 if ratings['reliable'][method2]==1 else 0
      }

    }

    for method in remainingMethods:
        response["others"][method] ={
        "savings":discount_ratings[method],
        "cashback":cashback.get(method, []),
        "tags":{
        "most": 1 if ratings['most'][method]==1 else 0,
        "easy": 1 if ratings['easy'][method]==1 else 0,
        "fast": 1 if ratings['fast'][method]==1 else 0,
        "discount": 1 if ratings['discount'][method]==1 else 0,
        "reliable": 1 if ratings['reliable'][method]==1 else 0
      }

    }



    return jsonify({'data':response})



if __name__ == '__main__':


    background_thread = Thread(target=monitor_sheet,args=(10,1000))
    background_thread.daemon = True
    background_thread.start()
    app.run(host='0.0.0.0', port=11000,debug=True)
