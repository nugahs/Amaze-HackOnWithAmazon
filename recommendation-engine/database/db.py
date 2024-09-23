import firebase_admin
from firebase_admin import credentials,db
import hashlib
import requests
import json

cred = credentials.Certificate("./test-1bede-firebase-adminsdk-zv4wf-6a8950e55a.json")
firebase_admin.initialize_app(cred,{
        'databaseURL':"https://test-1bede-default-rtdb.firebaseio.com/"
        })


class userDB:

    def __init__(self):
        pass

    def addUser(self,user):
        id = hashlib.md5(user["email"].encode('utf-8')).hexdigest()
        ref = db.reference('/users/')
        users = ref.get()
        users[id]=user
        ref.set(users)
        return user

    def getUser(self,email):
        id = hashlib.md5(email.encode('utf-8')).hexdigest()
        ref = db.reference('/users/')
        users = ref.get()
        return users[id]
    
    def getUserID(self,email):
        id = hashlib.md5(email.encode('utf-8')).hexdigest()
        ref = db.reference('/users/')
        users = ref.get()
        return users[id]["userID"]

    def addTags(self,email,tags):
        id = hashlib.md5(email.encode('utf-8')).hexdigest()
        ref = db.reference('/users/')
        users = ref.get()
        users[id]["tags"]=tags
        ref.set(users)

    def getTags(self,email):
        id = hashlib.md5(email.encode('utf-8')).hexdigest()
        ref = db.reference('/users/')
        users = ref.get()
        return users[id]["tags"]

    def addUserPayment(self,email,amount,name,tag,savings):
        print(email)
        url = "http://localhost:10000/payment/"+email
        data = {
        "name":name,
        "amount":amount,
        "saving":savings,
        "img":"localhost",
        "month":4,
        "year":2024,
        "tag":tag
        }
        headers = {
            "Content-Type" : "application/json"
        }
        json_data = json.dumps(data)
        headers = {'Content-Type': 'application/json'}
        requests.post(url, data=json_data, headers=headers,verify=False)
        

    


class cashbackDB:

    def __init__(self):
        pass

    def addCashback(self,coupon,method):
        ref = db.reference(f"/cashback/{method}")
        cashback = ref.get()
        cashback.append(coupon)
        ref.set(cashback)
        return coupon

    def getCashBack(self):
        ref = db.reference('/cashback/')
        cashback = ref.get()
        return cashback
    


