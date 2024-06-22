from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)

CORS(app)
load_dotenv()
client = OpenAI(api_key = os.getenv('API_KEY'))

def get_model_response(prompt):
    try:
        response = client.chat.completions.create(
            model="ft:gpt-3.5-turbo-0125:personal::9cx0jt8Z",  # Your fine-tuned model
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


@app.route('/', methods=['POST'])
def add_tag():
    data = request.get_json()
    extracted_query = data['query']
    return jsonify({'status': 'success','message':get_model_response(extracted_query)}), 200 

if __name__ == '__main__':
    app.run(debug=True)
