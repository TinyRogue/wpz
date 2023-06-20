import os

import firebase_admin
from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app, storage
import openai

openai.api_key = os.environ["OPENAI_API_KEY"]

cred = credentials.Certificate("wpz-ebook-firebase-adminsdk-dpdbt-1d6d7d1d23.json")
default_app = initialize_app(cred, {
    'storageBucket': 'wpz-ebook.appspot.com'
})

db = firestore.client(default_app)
bucket = storage.bucket()


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


@app.route("/user/<string:userId>/books", methods=['GET'])
def read(userId):
    try:
        books = db.collection('books').where("userId", "==", userId).stream()
        res = []
        for book in books:
            res.append(book.to_dict())
        return jsonify(res)
    except Exception as e:
        return e


@app.route("/user/<string:userId>/books", methods=['POST'])
def add(userId):
    if 'file' not in request.files:
        return 'No file uploaded.', 400

    file = request.files['file']

    # Validate the file extension
    if file.filename.endswith('.epub'):
        # Save the file to a desired location

        if not os.path.exists('tmp'):
            os.makedirs('tmp')

        temp_path = f'tmp/{file.filename}'
        file.save(temp_path)

        blob = bucket.blob(file.filename)
        blob.upload_from_filename(temp_path)

        os.remove(temp_path)

        document_data = {
            'filename': file.filename,
            'storage_path': f'gs://wpz-ebook.appspot.com/{file.filename}'
        }
        db.collection('files').add(document_data)

        return 'File uploaded successfully.'
    else:
        return 'Invalid file format. Please upload an EPUB file.', 400


@app.route("/user/<string:userId>/phrases", methods=['GET'])
def getphrases(userId):
    try:
        phrases = db.collection('phrases').where("userId", "==", userId).stream()
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
