from . import db 

class User(db.Model):
    email = db.Column(db.String(30), primary_key=True)
    password = db.Column(db.String(30))
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    balance = db.Column(db.Integer)