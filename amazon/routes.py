from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import models
import forms

import sqlite3, hashlib, os
from werkzeug.utils import secure_filename
from forms import ItemSearchForm

from flask_login import login_user, current_user, logout_user, login_required




app = Flask(__name__)
app.secret_key = 's3cr3t'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app, session_options={'autocommit': False})

# Reviews = [
# 	{
# 		'buyer_email':'',
# 		'seller_email':'',
# 		'item_id':'',
# 		'':'',
# 		'':'',
# 		'':'',
# 		'':'',
# 	},
# ]

@app.route('/')
@app.route('/home')
def home():
	technology = Item.query.filter_by(category='technology').all()
	# technology = Item.query.filter_by(category='technology').order_by(Item.rating).all()
	produce = Item.query.filter_by(category='produce').all()
	return render_template('home.html', category1=technology, category2=produce)

@app.route('/review/new', methods=['GET', 'POST'])
# @login_required
def new_review():
	# May need to import classes from *.models if in separate files
	form = ReviewForm()
	if form.validate_on_submit():
		review = Reviews(
			# id will populate automatically
			buyer_email=form.buyer_email.data,
			seller_email=form.seller_email.data,
			# datetime_submitted is automatically populated - no need here, no need on form
			item_id=form.item_id.data,
			rating_item=form.rating_item.data,
			rating_seller=form.rating_seller.data,
			review=form.review.data
			)
		db.session.add(review)
		db.session.commit()
		flash('Your review has been submitted!', 'success')
		return redirect(url_for('home'))
	return render_template('create_review.html', title='Write Review', form=form, 
							legend='Write Review')

# review_id is Reviews(id)
@app.route('/review/<int:review_id>', methods=['GET', 'POST'])
def review(review_id):
	review = Reviews.query.get_or_404(review_id)
	return render_template('review.html', title='See Review', review=review)
	# TODO: Create HTML template for looking at review, offer button that will take user
	# to the update page V

@app.route('/review/<int:review_id>/update', methods=['GET', 'POST'])
# @login_required
def update_review(review_id):
	review = Reviews.query.get_or_404(review_id)
	# TODO: Figure out how tf current_user works
	# if review.buyer_email != current_user:
	# 	abort(403)
	form = ReviewForm()
	if form.validate_on_submit():
		review = Reviews(
			# id will populate automatically
			buyer_email=form.buyer_email.data,
			seller_email=form.seller_email.data,
			# datetime_submitted is automatically populated - no need here, no need on form
			item_id=form.item_id.data,
			rating_item=form.rating_item.data,
			rating_seller=form.rating_seller.data,
			review=form.review.data
			)
		# No db.session.add(review) necessary
		db.session.commit()
		flash('Your review has been updated!', 'success')
		return redirect(url_for('review', review_id=review.id))
	# Rewatch videos (before 8) for why this is here
	elif request.method == 'GET':
		form.buyer_email.data = review.buyer_email
		form.seller_email.data = review.seller_email
		form.item_id.data = review.item_id
		form.rating_item.data = review.rating_item
		form.rating_seller.data = review.rating_seller
		form.review.data = review.review
		# In the example, he didn't worry about anything outside of the form fields
	return render_template('create_review.html', title='Update Review', review=review, 
							legend='Update Review')











if __name__ == "__main__":
	app.run(debug=True)

