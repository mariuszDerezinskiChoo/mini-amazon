from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///item.db'
app.secret_key = "abcd"
app.permanent_session_lifetime = timedelta(minutes = 2)

db = SQLAlchemy(app)
