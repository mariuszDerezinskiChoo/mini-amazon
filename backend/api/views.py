
from flask import Blueprint, jsonify, request
from . import db 
from .models import Buyer
from sqlalchemy import text
    # This allows for plain SQL queries to be held in python variables
    # https://stackoverflow.com/questions/17972020/how-to-execute-raw-sql-in-flask-sqlalchemy-app
    # https://stackoverflow.com/questions/902408/how-to-use-variables-in-sql-statement-in-python

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

@main.route('/recommended')
def recommended():
    # A more sophisticated page would for-loop over a query of every unique category in item
    # sql = text('SELECT DISTINCT category FROM item')
    
    # This method means we manually manage each category-column displayed on the page
    books_query = text('''
    WITH itemavg AS (
        SELECT item_id, AVG(rating_item) AS average_score
        FROM Reviews
        GROUP BY item_id)
    SELECT item_id, average_score
    FROM item, itemavg
    WHERE item.id = itemavg.item_id AND category = 'books'
    ORDER BY average_score DESC
    ''')
        # .headers ON <- to see column names
    books_table = db.engine.execute(books_query)
        # Returns a table of average rating per item in a category, sorted high-low
        # Books(item_id, average_score), high-low
    print(row[0] for row in books_table)


    # As with Amazon, we decide what categories exist.
    # A variable for each category stores a query re
	# books = Item.query.filter_by(category='books').order_by(Item.rating).all()
	# food = Item.query.filter_by(category='food').all()
    # render_template('recommended.html', category1=technology, category2=produce)

eventually, ideally clicking on an item on purchase history page should href to a url like
/loggedin-buyer_email/purchase-datetime/add_review (where buyer_email, datetime make a purchase primary key)
@main.route('/add_review', methods=['GET', 'POST'])
# @login_required
def add_review():
    review_data = request.get_json()
    
    new_review = Reviews(
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

# @main.route('/add_user', methods=['POST'])
# def add_user():
#     user_data = request.get_json()

#     new_user = User(email = user_data['email'],
#                     password = user_data['password'], 
#                     first_name = user_data['first_name'],
#                     last_name = user_data['last_name'],
#                     balance = user_data['balance'], 
#                     )
#     db.session.add(new_user)
#     db.session.commit()

#     return 'Done', 201

review_id is Reviews(id)
@main.route('/reviews/<int:review_id>', methods=['GET', 'POST'])
def review(review_id):
	review = Reviews.query.get_or_404(review_id)
	return render_template('review.html', title='See Review', review=review)
	# TODO: Create HTML template for looking at review, offer button that will take user
	# to the update page V

# AFTER MS2 DO REVIEW-UPDATE FEATURE! FOR NOW DWBI.
# @main.route('/review/<int:review_id>/update', methods=['GET', 'POST'])
# # @login_required
# def update_review(review_id):
# 	review = Reviews.query.get_or_404(review_id)
# 	# TODO: Figure out how tf current_user works
# 	# if review.buyer_email != current_user:
# 	# 	abort(403)
# 	form = ReviewForm()
# 	if form.validate_on_submit():
# 		review = Reviews(
# 			# id will populate automatically
# 			buyer_email=form.buyer_email.data,
# 			seller_email=form.seller_email.data,
# 			# datetime_submitted is automatically populated - no need here, no need on form
# 			item_id=form.item_id.data,
# 			rating_item=form.rating_item.data,
# 			rating_seller=form.rating_seller.data,
# 			review=form.review.data
# 			)
# 		# No db.session.add(review) necessary
# 		db.session.commit()
# 		flash('Your review has been updated!', 'success')
# 		return redirect(url_for('review', review_id=review.id))
# 	# Rewatch videos (before 8) for why this is here
# 	elif request.method == 'GET':
# 		form.buyer_email.data = review.buyer_email
# 		form.seller_email.data = review.seller_email
# 		form.item_id.data = review.item_id
# 		form.rating_item.data = review.rating_item
# 		form.rating_seller.data = review.rating_seller
# 		form.review.data = review.review
# 		# In the example, he didn't worry about anything outside of the form fields
# 	return render_template('create_review.html', title='Update Review', review=review, legend='Update Review')

