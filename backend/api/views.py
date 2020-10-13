
from flask import Blueprint, jsonify, request
from . import db 
from .models import User

main = Blueprint('main', __name__)

@main.route('/add_user', methods=['POST'])
def add_user():
    user_data = request.get_json()

    new_user = User(email = user_data['email'],
                    password = user_data['password'], 
                    first_name = user_data['first_name'],
                    last_name = user_data['last_name'],
                    balance = user_data['balance'], 
                    )
    db.session.add(new_user)
    db.session.commit()

    return 'Done', 201

@main.route('/users')
def users():
    user_list = User.query.all()
    users = []

    for user in user_list:
        users.append({'email': user.email, 
                    'password': user.password, 
                    'first_name':user.first_name, 
                    'last_name': user.last_name, 
                    'balance': user.balance})

    return jsonify({'users' : users})

@main.route('/cart')
def cart():
    # sql query
    # format data
    result = [
    {
        "itemName": "Macbook Pro",
        "sellerName": "Apple.com Inc.",
        "price": 1500,
        "count": 3,
        "imageUrl": "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        "description": "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."
    },
    {
        "itemName": "Macbook Pro",
        "sellerName": "Apple.com Inc.",
        "price": 1500,
        "count": 3,
        "imageUrl": "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        "description": "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."
    },
        {
        "itemName": "Macbook Pro",
        "sellerName": "Apple.com Inc.",
        "price": 1500,
        "count": 3,
        "imageUrl": "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        "description": "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."
    },
        {
        "itemName": "Macbook Pro",
        "sellerName": "Apple.com Inc.",
        "price": 1500,
        "count": 3,
        "imageUrl": "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        "description": "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."
    },
        {
        "itemName": "Macbook Pro",
        "sellerName": "Apple.com Inc.",
        "price": 1500,
        "count": 3,
        "imageUrl": "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
        "description": "Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage."
    }
]
    return jsonify(result)

@app.route('/recommended')
def recommended():
	technology = Item.query.filter_by(category='technology').all()
	# technology = Item.query.filter_by(category='technology').order_by(Item.rating).all()
	produce = Item.query.filter_by(category='produce').all()
    sports = 
    pets = 
    render_template('recommended.html', category1=technology, category2=produce)

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
	return render_template('create_review.html', title='Write Review', form=form, legend='Write Review')

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
	return render_template('create_review.html', title='Update Review', review=review, legend='Update Review')

