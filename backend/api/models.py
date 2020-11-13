from . import db 
from datetime import datetime

# python3
# from api.models import Buyer <- BE ONE DIR UP FROM backend/api/models.py, i.e., backend/
# from api import db, create_app
# db.create_all(app=create_app())

class Buyer(db.Model):
    __tablename__ = 'buyer'
    __table_args__ = {'extend_existing': True}
    email = db.Column(db.String(30), primary_key=True)
    password = db.Column(db.String(30), nullable=False)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    balance = db.Column(db.Integer, nullable=False)
    # photo_url = db.Column(db.String(100), nullable=False)

class Storefront(db.Model):
    __tablename__ = 'storefront'
    email = db.Column(db.String(30), primary_key=True)
    password = db.Column(db.String(30), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    balance = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    # photo_url = db.Column(db.String(100),nullable=False)

class Item(db.Model):
	# This is automatically populated for every valid entry made into the db
    __tablename__ = 'item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(30), nullable=False)
    # photo_url = db.Column(db.String(100),nullable=False)

class Listing(db.Model):
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    storefront_email = db.Column(db.String(30), db.ForeignKey('storefront.email'), primary_key=True)

class Cart(db.Model):
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    storefront_email = db.Column(db.String(30), db.ForeignKey('storefront.email'), primary_key=True)
    buyer_email = db.Column(db.String(30), db.ForeignKey('buyer.email'), primary_key=True)

class Purchase(db.Model):
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    storefront_email = db.Column(db.String(30), db.ForeignKey('storefront.email'), primary_key=True)
    buyer_email = db.Column(db.String(30), db.ForeignKey('buyer.email'), primary_key=True)
    datetime = db.Column(db.DateTime, default=datetime.utcnow, primary_key=True)

class Reviews(db.Model):
    __tablename__ = 'reviews'
    # item_id = db.Column(db.Integer, db.ForeignKey('item.id'))
    # storefront_email = db.Column(db.String(30), db.ForeignKey('storefront.email'))
    # buyer_email = db.Column(db.String(30), db.ForeignKey('buyer.email'), primary_key=True)
    # datetime_submitted = db.Column(db.DateTime, default=datetime.utcnow, primary_key=True)
    # rating_item = db.Column(db.Integer, nullable=False)
    # rating_storefront = db.Column(db.Integer)
    # review = db.Column(db.Text, nullable=False)

    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), primary_key=True)
    storefront_email = db.Column(db.String(30), db.ForeignKey('storefront.email'), primary_key=True)
    buyer_email = db.Column(db.String(30), db.ForeignKey('buyer.email'), primary_key=True)
    rating_item = db.Column(db.Integer, nullable=False)
    rating_storefront = db.Column(db.Integer)
    review = db.Column(db.Text, nullable=False)

