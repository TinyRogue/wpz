import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app, storage
import openai
from dotenv import load_dotenv
from werkzeug.utils import secure_filename

load_dotenv()
openai.api_key = os.environ["OPENAI_API_KEY"]

cred = credentials.Certificate("firebase_creds.json")
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
        file = request.files['file']
        image = request.files['image']
        filename = secure_filename(file.filename)
        imagename = secure_filename(image.filename)
        userid = request.form["userId"]
        filepath = userid + "/" + filename
        imagepath = userid + "/" + imagename
        blob = bucket.blob(filepath)
        blob.upload_from_string(file.read(), content_type=file.content_type)

        blob = bucket.blob(imagepath)
        blob.upload_from_file(image, content_type=image.content_type)

        book = {
            'userId': userid,
            'title': request.form["title"],
            'bodyRef': filepath,
            'imageRef': imagepath
        }
        db.collection('books').add(book)

        return "Succesfully added!"
    except Exception as e:
        return e.__str__()


@app.route("/user/<string:userId>/books", methods=['GET'])
def read(userId):
    try:
        books = db.collection('books').where("userId", "==", userId).stream()
        res = []
        for book in books:
            res.append(book.to_dict())
        return jsonify(res)
    except Exception as e:
        return e.__str__()


@app.route("/user/<string:userId>/phrases", methods=['GET'])
def getphrases(userId):
    try:
        phrases = db.collection('phrases').where("userId", "==", userId).stream()
        res = []
        for phrase in phrases:
            res.append(phrase.to_dict())
        return jsonify(res)
    except Exception as e:
        return e.__str__()


@app.route("/phrases", methods=['POST'])
def translate():
    messages = []
    req = request.get_json()
    try:
        messages.append({"role": "user", "content": "Please translate " + req['phrase'] + " into " + req['language']})
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )
        tr = response["choices"][0]["message"]["content"]
        db.collection('phrases').add(
            {'phrase': req['phrase'], 'language': req['language'], 'translation': tr, 'userId': req['userId']})
        return "Translated"
    except Exception as e:
        return e.__str__()


if __name__ == '__main__':
    app.run()
