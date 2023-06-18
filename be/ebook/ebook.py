import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app
import openai

openai.api_key = os.environ["OPENAI_API_KEY"]

cred = credentials.Certificate("wpz-ebook-firebase-adminsdk-dpdbt-1d6d7d1d23.json")
default_app = initialize_app(cred)
db = firestore.client(default_app)

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "Hello, cross-origin-world!"


@app.route("/books", methods=['POST'])
def write():
    try:
        db.collection('books').add(request.get_json())
        return "Succesfully added!"
    except Exception as e:
        return e


@app.route("/books", methods=['GET'])
def read():
    try:
        books = db.collection('books').where("userId", "==", request.get_json()['userId']).stream()
        res = []
        for book in books:
            res.append(book.to_dict())
        return jsonify(res)
    except Exception as e:
        return e


@app.route("/phrases", methods=['GET'])
def getphrases():
    try:
        phrases = db.collection('phrases').where("userId", "==", request.get_json()['userId']).stream()
        res = []
        for phrase in phrases:
            res.append(phrase.to_dict())
        return jsonify(res)
    except Exception as e:
        return e


@app.route("/phrases", methods=['POST'])
def translate():
    messages = []
    req = request.get_json()
    try:
        messages.append({"role": "user", "content": "Please translate " + req['phrase'] + " into "+req['language']})
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        tr = response["choices"][0]["message"]["content"]
        db.collection('phrases').add({'phrase': req['phrase'], 'language': req['language'], 'translation': tr, 'userId': req['userId']})
        return "Translated"
    except Exception as e:
        return e


if __name__ == '__main__':
    app.run()
