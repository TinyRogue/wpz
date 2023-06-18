from flask import Flask
from flask_cors import CORS
from firebase_admin import credentials, firestore, initialize_app

cred = credentials.Certificate("wpz-ebook-firebase-adminsdk-dpdbt-1d6d7d1d23.json")
default_app = initialize_app(cred)
db = firestore.client(default_app)

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "Hello, cross-origin-world!"


@app.route("/firestore")
def firestore_test():
    print(db.collection('test').add({'title': 'wiedzmin'}))
    res = db.collection('test').document('1').get().to_dict()
    return res


if __name__ == '__main__':
    app.run()
