from sqlalchemy import sql, orm
from hello import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'user'
    __table_args__ = {'extend_existing': True}
    email = db.Column(db.String(30), primary_key=True)
    password = db.Column(db.String(30),nullable=False)
    first_name = db.Column(db.String(20),nullable=False)
    last_name = db.Column(db.String(20),nullable=False)
    balance = db.Column(db.Integer, nullable=False)
    is_seller = db.Column(db.Boolean, default=False)
    seller_desc = db.Column(db.Text, nullable=False)


class Item(db.Model):
	# This is automatically populated for every valid entry made into the db
	id = db.Column(db.Integer, primary_key=True)
	category = db.Column(db.String(30), nullable=False)
	name = db.Column(db.String(30), nullable=False)
	description = db.Column(db.Text, nullable=False)
	# image_url

class Reviews(db.Model):
	__tablename__ = 'reviews'
	# We could set this unique id to be the primary key, or the set of buyer,seller,date
	# id = db.Column(db.Integer, nullable=False, unique=True)
	# buyer_email = db.Column(db.String(30), db.ForeignKey('user.email'), primary_key=True)
	# seller_email = db.Column(db.String(30), db.ForeignKey('user.email'), primary_key=True)
	# datetime_submitted = db.Column(db.DateTime, default=datetime.utcnow, primary_key=True)
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	buyer_email = db.Column(db.String(30), db.ForeignKey('user.email'))
	seller_email = db.Column(db.String(30), db.ForeignKey('user.email'))
	datetime_submitted = db.Column(db.DateTime, default=datetime.utcnow)

	item_id = db.Column(db.Integer, db.ForeignKey('item.id'),nullable=False)
	rating_item = db.Column(db.Integer, nullable=False)
	rating_seller = db.Column(db.Integer)
	review = db.Column(db.Text, nullable=False)

class Selling(db.Model):
    seller_email = db.Column(db.String(30), db.ForeignKey('user.email'),primary_key=True)
    item_id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer,nullable=False)
    quantity = db.Column(db.Integer,nullable=False)

class Purchase(db.Model):
    seller_email = db.Column(db.String(30), db.ForeignKey('user.email'),primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), primary_key=True)
    buyer_email = db.Column(db.String(30), db.ForeignKey('user.email'),primary_key=True)
    price = db.Column(db.Integer,nullable=False)
    quantity = db.Column(db.Integer,nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow,nullable=False)

class Cart(db.Model):
    seller_email = db.Column(db.String(30), db.ForeignKey('user.email'),primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), primary_key=True)
    buyer_email = db.Column(db.String(30), db.ForeignKey('user.email'),primary_key=True)
    quantity = db.Column(db.Integer,nullable=False)