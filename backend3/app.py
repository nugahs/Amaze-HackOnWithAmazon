from flask import Flask, request, jsonify, after_this_request
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os


load_dotenv()
client = OpenAI(api_key = os.getenv('API_KEY'))


app = Flask(__name__)
# Your chatbot function@app.before_request
cors = CORS(app, resources={r"/": {"origins": "*"}})


# Before request function to add CORS headers
@app.before_request
def before_request_func():
    @after_this_request
    def add_cors_headers(response):
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        response.headers.add('Access-Control-Allow-Headers',
                             'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, Content-Type, Authorization')
        return response


def get_model_response(prompt):
    try:
        response = client.chat.completions.create(
            model="ft:gpt-3.5-turbo-0125:personal::9cZDQKYv",  # Your fine-tuned model
            messages=[
                {"role": "system", "content": "You are a helpful Amazon assistant and you have to resolve customer payment queries."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {e}"


# Flask route to handle chat requests
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data.get('prompt', '')
    print(prompt)
    response_text = get_model_response(prompt)
    response = jsonify({'response': response_text})
    return response


def add_cors_headers(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    response.headers['Access-Control-Allow-Headers'] = 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, Content-Type, Authorization'
    return response


app.after_request = add_cors_headers

# Run the Flask app as a server (needs to be outside any function)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
    CORS(app, origins=['http://localhost:3000'])
