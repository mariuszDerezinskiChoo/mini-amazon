
from flask import Blueprint, jsonify, request
from . import db 
from .models import User, Item, Selling, Buyer

main = Blueprint('main', __name__)

@main.route('/add_buyer', methods=['POST'])
def add_buyer():
    buyer_data = request.get_json()

    new_buyer = Buyer(email = buyer_data['email'],
                    password = buyer_data['password'], 
                    first_name = buyer_data['first_name'],
                    last_name = buyer_data['last_name'],
                    balance = buyer_data['balance'], 
                    )
    db.session.add(new_buyer)
    db.session.commit()

    return 'Done', 201

@main.route('/buyers')
def buyers():
    buyer_list = Buyer.query.all()
    buyers = []

    for buyer in buyer_list:
        buyers.append({'email': buyer.email, 
                    'password': buyer.password, 
                    'first_name':buyer.first_name, 
                    'last_name': buyer.last_name, 
                    'balance': buyer.balance})

    return jsonify({'buyers' : buyers})

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

@main.route('/seller', methods=['POST', 'PUT', 'GET'])
def seller():
    if request.method == 'POST':
        # item_name = request.form[]
        req = request.json
        print(req)
        print(req['price'])
        return 'new item submitted'
    elif request.method == 'PUT':
        #DB QUERY
        req = request.json
        print(req)
        print(req['price'])
        return 'edit submitted'
    else:
        # listings = Selling.query.filter_by(seller_email='{THIS USERS EMAIL}')
        # items = Item.query.filter_by(item_id={EACH ID IN LISTINGS})
        random = Item.query.filter_by(id=6).first()
        return random.name

# @main.route('/recommended')
# def recommended():
# 	technology = Item.query.filter_by(category='technology').all()
# 	# technology = Item.query.filter_by(category='technology').order_by(Item.rating).all()
# 	produce = Item.query.filter_by(category='produce').all()
#     sports = 
#     pets = 
#     render_template('recommended.html', category1=technology, category2=produce)

# eventually, ideally clicking on an item on purchase history page should href to a url like
# /loggedin-buyer_email/purchase-datetime/add_review (where buyer_email, datetime make a purchase primary key)
@main.route('/add_review', methods=['GET', 'POST'])
# @login_required
def add_review():
	# if form.validate_on_submit():
    new_review = Reviews(
        # id will populate automatically?
        buyer_email=form.buyer_email.data,
        seller_email=form.seller_email.data,
        # datetime_submitted is automatically populated?
        item_id=form.item_id.data,
        rating_item=form.rating_item.data,
        rating_seller=form.rating_seller.data,
        review=form.review.data
        )
    db.session.add(new_review)
    db.session.commit()
    # flash('Your review has been submitted!', 'success')
    return render_template('create_review.html', title='Write Review', form=form, legend='Write Review')

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

# review_id is Reviews(id)
@main.route('/reviews/<int:review_id>', methods=['GET', 'POST'])
def review(review_id):
	review = Reviews.query.get_or_404(review_id)
	return render_template('review.html', title='See Review', review=review)
	# TODO: Create HTML template for looking at review, offer button that will take user
	# to the update page V

@main.route('/review/<int:review_id>/update', methods=['GET', 'POST'])
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