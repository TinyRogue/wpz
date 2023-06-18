import pyrebase
import gradio

firebaseConfig = {
    'apiKey': "AIzaSyCLqmCPJ-yyZUetOoRKPxkwvV89XLUbTT8",
    'authDomain': "wpz-ebook.firebaseapp.com",
    'projectId': "wpz-ebook",
    'databaseURL': 'wpz-ebook.fireabseio.com',
    'storageBucket': "wpz-ebook.appspot.com",
    'messagingSenderId': "760102241396",
    'appId': "1:760102241396:web:9f8ea77480fb9d5dd4bd21"
}

app = pyrebase.initialize_app(firebaseConfig)
auth = app.auth()


def signup(email, password):
    try:
        user = auth.create_user_with_email_and_password(email, password)
        return "Acc created"
    except:
        return "Email taken"


def login(email, password):
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return user
    except Exception as e:
        return e


interface1 = gradio.Interface(fn=signup, inputs=["text", "text"], outputs="text", title="Sign up")

interface2 = gradio.Interface(fn=login, inputs=["text", "text"], outputs="text", title="Log in")

gradio.TabbedInterface([interface1,interface2],["Sign up","Log in"]).launch()

