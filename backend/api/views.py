from flask import Blueprint, jsonify, request
from . import db 
from .models import Buyer
from .models import Buyer, Item, Storefront, Listing

main = Blueprint('main', __name__)

@main.route('/add_buyer', methods=['POST'])
def add_buyer():
    buyer_data = request.get_json()

    new_buyer = Buyer(email = buyer_data['email'],
                    password = buyer_data['password'], 
                    first_name = buyer_data['first_name'],
                    last_name = buyer_data['last_name'],
                    balance = buyer_data['balance'], 
                    security_question = buyer_data['security_question'],
                    security_answer = buyer_data['security_answer']
                    )
    db.session.add(new_buyer)
    db.session.commit()
    return 'Buyer Added'

@main.route('/buyers', methods = ['GET','POST'])
def buyers():
    if request.method == 'POST':
        req = request.json
        buyer_email = req['email']
        buyer_password = req['password']
        buyer_info = []
        buyer = db.engine.execute('SELECT email, first_name, balance, last_name, password FROM Buyer WHERE Buyer.email = "{}" AND Buyer.password = "{}";'.format(buyer_email,buyer_password))
        for b in buyer:
            buyer_info.append({'email': b.email, 
                    'first_name': b.first_name, 
                    'last_name': b.last_name, 
                    'balance': b.balance,
                    'password': b.password })
        return jsonify({'buyer_detail' : buyer_info})

    if request.method == 'GET':
        buyer_list = Buyer.query.all()
        buyers = []

        for buyer in buyer_list:
            buyers.append({'email': buyer.email, 
                        'first_name':buyer.first_name, 
                        'last_name': buyer.last_name, 
                        'balance': buyer.balance,
                        'password': buyer.password})

        return jsonify({'buyers' : buyers})

@main.route('/buyerseditpassword', methods = ['POST'])
def buyersedit():
    req = request.json
    buyer_email = req['email']
    buyer_new_password = req['newPass']
    db.engine.execute('UPDATE Buyer SET password = "{}" where email = "{}";'.format(buyer_new_password,buyer_email))
    return 'Password Updated'


@main.route('/buyerssecurity', methods = ['POST'])
def buyerssecurity():
    req = request.json
    buyersecurity_email = req['email']
    buyersecurity_info = []
    buyer_security = db.engine.execute('SELECT b.email, b.password, b.security_question, b.security_answer FROM Buyer b WHERE b.email = "{}";'.format(buyersecurity_email))
    for i in buyer_security:
        buyersecurity_info.append({'email': i.email, 
            'password': i.password,
            'security_question': i.security_question,
            'security_answer': i.security_answer})
    return jsonify({'buyer_security' : buyersecurity_info})

@main.route('/storefronts', methods = ['GET','POST'])
def storefronts():
    if request.method == 'POST':
        req = request.json
        storefront_email = req['email']
        storefront_password = req['password']
        storefront_info = []
        storefront = db.engine.execute('SELECT s.email, s.name, s.balance, s.description, s.password FROM Storefront s WHERE s.email = "{}" and s.password = "{}";'.format(storefront_email,storefront_password))
        for s in storefront:
            storefront_info.append({'email': s.email, 
                    'name': s.name, 
                    'description': s.description, 
                    'balance': s.balance,
                    'password': s.password })
        return jsonify({'storefronts' : storefront_info})

    if request.method == 'GET':
        storefront_list = Storefront.query.all()
        storefronts = []

        for storefront in storefront_list:
            storefronts.append({'email': storefront.email, 
                        'name':storefront.name, 
                        'description': storefront.description, 
                        'balance': storefront.balance,
                        'password': storefront.password})

        return jsonify({'storefronts' : storefronts})

@main.route('/add_storefront', methods=['POST'])
def add_storefront():
    storefront_data = request.get_json()

    new_storefront = Storefront(email = storefront_data['email'],
                    password = storefront_data['password'], 
                    name = storefront_data['name'],
                    description = storefront_data['description'],
                    security_question = storefront_data['security_question'],
                    security_answer = storefront_data['security_answer'],
                    balance = storefront_data['balance'], 
                    )
    db.session.add(new_storefront)
    db.session.commit()
    return 'Storefront added'
    
@main.route('/storefrontssecurity', methods = ['POST'])
def storefrontssecurity():
    req = request.json
    storefrontsecurity_email = req['email']
    storefrontsecurity_info = []
    storefront_security = db.engine.execute('SELECT s.email, s.password, s.security_question, s.security_answer FROM Storefront s WHERE s.email = "{}";'.format(storefrontsecurity_email))
    for i in storefront_security:
        storefrontsecurity_info.append({'email': i.email, 
                'password': i.password,
                'security_question': i.security_question,
                'security_answer': i.security_answer})
    return jsonify({'storefront_security' : storefrontsecurity_info})

@main.route('/storefrontseditpassword', methods = ['POST'])
def storefrontsedit():
    req = request.json
    storefront_email = req['email']
    storefront_new_password = req['newPass']
    db.engine.execute('UPDATE Storefront SET password = "{}" where email = "{}";'.format(storefront_new_password,storefront_email))
    return 'Done'


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
    if search == "all":
        #item_list = Item.query.filter_by(name = search)
        item_list = Item.query.all()
    else:
        item_list = Item.query.filter_by(name = search)
        #item_list = Item.query.all()
    listing_list = Listing.query.all()
    listings = []

    for item in item_list:
        listings.append({'id': item.id,
                    'name': item.name})

    for i in listings:
        for l in listing_list:
            if i['id'] == l.item_id:
                i['quantity'] = l.quantity
                i['price'] = l.price

    return jsonify({'listings' : listings})
