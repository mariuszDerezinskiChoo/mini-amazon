from flask import Blueprint, jsonify, request
from . import db 
from .models import Buyer
from .models import Buyer, Item, Storefront, Listing, Cart

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
    query_text = """select i.name, i.description, i.category, l.price, c.quantity, c.item_id, s.name as sellername, s.email as selleremail, i.id as item_id
                    from item i, listing l, cart c, storefront s
                    where c.item_id = l.item_id and i.id = l.item_id and c.storefront_email = l.storefront_email and s.email = l.storefront_email;"""
    res = db.engine.execute(query_text)
    response = []
    for row in res:
        response.append({
            "itemId" : row.item_id,
            "itemName" : row.name,
            "sellerName": row.sellername,
            "price" : row.price,
            "quantity" : row.quantity,
            "sellerEmail": row.selleremail,
            "imageUrl": "https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg",
            "description": row.description
        })
    return jsonify(response)

@main.route('/add_cart', methods=['POST'])
def add_cart():
    cart_data = request.get_json()

    new_cart = Cart(item_id = cart_data['id'],
                    quantity = cart_data['quantity'], 
                    storefront_email = cart_data['selleremail'],
                    buyer_email = cart_data['buyeremail'],
                    )

    db.session.add(new_cart)
    db.session.commit()

    return 'Done', 201

@main.route('/updateCart', methods = ['POST'])
def update_cart():
    req = request.json
    buyer_email = 'buyer_email1@gmail.com'
    item_id = req['itemId']
    seller_email = req['sellerEmail']
    new_quantity = req['quantity']
    # todo: validate size
    db.engine.execute('UPDATE cart SET quantity = {} where storefront_email = "{}" and item_id = "{}" and buyer_email = "{}";'.format(new_quantity,seller_email,item_id,buyer_email))

    return 'Done', 201

@main.route('/seller', methods=['POST', 'PUT', 'GET'])
def seller():
    if request.method == 'POST':
        req = request.json
        new_item = Item(name=req['name'], description=req['item_desc'], category=req['category'])
        db.session.add(new_item)
        db.session.commit()
        item = Item.query.filter_by(name=req['name'], description=req['item_desc']).first()
        item_id = item.id
        new_listing = Listing(item_id=item_id, quantity=req['quantity'], price=req['price'], storefront_email="storefront_email1@gmail.com") # TODO: make this seller specific
        db.session.add(new_listing)
        db.session.commit()

        return 'new item submitted'
    elif request.method == 'PUT':
        #DB QUERY
        req = request.json
        print(req)
        print(req['price'])
        return 'edit submitted'
    else:
        # listings = Listing.query.filter_by(seller_email='{THIS USERS EMAIL}')
        # items = Item.query.filter_by(item_id={EACH ID IN LISTINGS})
        listings_list = []
        listings = Listing.query.filter_by(storefront_email="storefront_email1@gmail.com").all() # TODO: make this seller specific
        for listing in listings:
            data = {}
            item = Item.query.filter_by(id=listing.item_id).first()
            data['id'] = listing.item_id
            data['name'] = item.name
            data['price'] = listing.price
            data['quantity'] = listing.quantity
            listings_list.append(data)

        return jsonify({'listings':listings_list})

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


#get info from search bar
@main.route('/listings/<search>')
def listings(search):
    text = search
    res = db.engine.execute('SELECT i.id, i.name, l.quantity, l.price, s.name as sellername FROM item i, listing l, storefront s WHERE i.name LIKE "%{}%" and i.id = l.item_id and l.storefront_email = s.email;'.format(text))
    listings = []
    for row in res:
        listings.append({
            "id" : row.id,
            "name" : row.name,
            "price" : row.price,
            "quantity" : row.quantity,
            "seller" : row.sellername
        })
    if not listings:
        return jsonify(listings)

    return jsonify({'listings' : listings})

@main.route('/item/<item>/<seller>/<item_id>')
def item(item, seller, item_id):
    res = db.engine.execute('WITH a AS (SELECT * FROM listing l, item i WHERE l.item_id = {} and i.name = "{}"), b AS (SELECT a.item_id, a.name, a.description, a.category, a.storefront_email, a.price, a.quantity, s.name as sellername FROM a INNER JOIN storefront s ON a.storefront_email = s.email) SELECT * FROM b WHERE sellername = "{}";'.format(item_id, item, seller))
    items = []
    for row in res:
        items.append({
            "id" : row.item_id,
            "name" : row.name,
            "description" : row.description,
            "category" : row.category,
            "selleremail" : row.storefront_email,
            "seller" : row.sellername,
            "price" : row.price,
            "quantity" : row.quantity,
            "reviews" : []
        })
    semail = items[0]["selleremail"]
    rate = db.engine.execute('SELECT COUNT(*) as total, AVG(rating_item) as rating, r.buyer_email, r.rating_item, r.review FROM reviews r WHERE r.item_id = {} and r.storefront_email = "{}";'.format(item_id, semail))
    rate2 = db.engine.execute('SELECT * FROM reviews r WHERE r.item_id = {} and r.storefront_email = "{}";'.format(item_id, semail))
    for row in rate:
        for item in items:
            item["avg_rating"] = row.rating
            item["total_reviews"] = row.total

    for row in rate2:
        for item in items:
            item["reviews"].append({"email" : row.buyer_email, "rating" : row.rating_item, "review" : row.review})
            #item["reviews"].append("rating" : row.rating_item)
            #item["reviews"].append("review" : row.review)

    return jsonify({'items' : items})
