# models.py
# https://flask-sqlalchemy.palletsprojects.com/en/2.x/quickstart/
# https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/
from datetime import datetime
from amazon import db # Rename as necessary
# from flaskblog import db, login_manager
# from flask_login import UserMixin




# Somebody else is doing Item, this is just my go at it so I can reference it in my Reviews schema
class Item(db.Model):
	# This is automatically populated for every valid entry made into the db
	id = db.Column(db.Integer, primary_key=True)
	category = db.Column(db.String(30), nullable=False)
	name = db.Column(db.String(30), nullable=False)
	description = db.Column(db.Text, nullable=False)
	# image_url

# Karoline's User class
class User(db.Model):
	email = db.Column(db.String(30), primary_key=True)
	password = db.Column(db.String(30))
	first_name = db.Column(db.String(20))
	last_name = db.Column(db.String(20))
	balance = db.Column(db.Integer)
	# Added this line
	is_seller = db.Column(db.Boolean)

# Using Karoline's User class information
# For what properties we know we want, this order: db.Column(type, nullable, etc, fk, pk)
# Reviews doesn't use one-to-many relations (i.e., no db.relationship('Table', backref='author', lazy=True))
# https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/#one-to-many-relationships
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

	item_id = db.Column(db.Integer, nullable=False, db.ForeignKey('item.id'))
	rating_item = db.Column(db.Integer, nullable=False)
	rating_seller = db.Column(db.Integer)
	review = db.Column(db.Text, nullable=False)



