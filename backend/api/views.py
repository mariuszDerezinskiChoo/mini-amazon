from flask import Blueprint, jsonify, request
from . import db 
from .models import Buyer, Storefront, Item, Listing, Cart, Purchase, Reviews
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
        item = Item.query.filter_by(id=req['id']).first()
        listing = Listing.query.filter_by(item_id=req['id'], storefront_email="storefront_email1@gmail.com").first() # TODO: make this seller specific
        seller = Storefront.query.filter_by(email="storefront_email1@gmail.com").first() # TODO: make this seller specific

        item.name = req['name']
        listing.price = req['price']
        listing.quantity = req['quantity']
        item.category = req['category']
        item.description = req['item_desc']
        seller.description = req['seller_desc']

        db.session.commit()
        print(req)

        return 'edit submitted'
    else:
        # listings = Listing.query.filter_by(seller_email='{THIS USERS EMAIL}')
        # items = Item.query.filter_by(item_id={EACH ID IN LISTINGS})
        listings_list = []
        listings = Listing.query.filter_by(storefront_email="storefront_email1@gmail.com").all() # TODO: make this seller specific
        seller = Storefront.query.filter_by(email="storefront_email1@gmail.com").first() # TODO: make this seller specific
        for listing in listings:
            data = {}
            item = Item.query.filter_by(id=listing.item_id).first()
            data['id'] = listing.item_id
            data['name'] = item.name
            data['price'] = listing.price
            data['quantity'] = listing.quantity
            data['category'] = item.category
            data['item_desc'] = item.description
            data['seller_desc'] = seller.description
            # data['picture'] = item.photo_url

            listings_list.append(data)

        return jsonify({'listings':listings_list})

@main.route('/review', methods=['GET', 'PUT', 'POST'])
def review():
    if request.method == 'POST':
        review_data = request.get_json()
        new_review = Reviews(item_id=review_data['item_id'],
                                storefront_email=review_data['storefront_email'],
                                buyer_email=review_data['buyer_email'],
                                rating_item=review_data['rating_item'],
                                rating_storefront=review_data['rating_storefront'],
                                review=review_data['review']
                            )
        db.session.add(new_review)
        db.session.commit()
        return 'Done', 201
        # Works! But only for tuples that satisfy the input conditions (here, PK is id-storefront-buyer w/ FK considerations)
        # If the commit doesn't work, how can we show the user that it didn't get added to db?
        # The form can check data types, but only a request to db can ensure if PK/FK are satisfied

    elif request.method == 'PUT':
        #DB QUERY
        req = request.json

        # These three PK values can't be changed on the frontend, so this will always find the intended tuple
        review = Reviews.query.filter_by(item_id=req['item_id'], storefront_email=req['storefront_email'], buyer_email=req['buyer_email']).first()

        # review.item_id = req['item_id']
        # review.storefront_email = req['storefront_email']
        # review.buyer_email = req['buyer_email']
        review.rating_item = req['rating_item']
        review.rating_storefront = req['rating_storefront']
        review.review = req['review']
        
        db.session.commit()
        print(req)

        return 'edit submitted'
        # Ideally, the page automatically refreshes to refetch updated tuples

    else:
        reviews_list = []

        # username = login_session_username... (e.g., buyer_email1@gmail.com)
        username = "buyer_email1@gmail.com"
        reviews = Reviews.query.filter_by(buyer_email=username).all()
        for review in reviews:
            data = {}
            item = Item.query.filter_by(id=review.item_id).first()
            data['item_name'] = item.name
            data['item_id'] = review.item_id
            data['storefront_email'] = review.storefront_email
            data['buyer_email'] = review.buyer_email
            data['rating_item'] = review.rating_item
            data['rating_storefront'] = review.rating_storefront
            data['review'] = review.review

            reviews_list.append(data)

        return jsonify({'reviews_endpt':reviews_list})

        # ALTERNATIVE METHOD
        # # username = login_session_username... (e.g., buyer_email1@gmail.com)
        # username = "buyer_email1@gmail.com"
        # sql = text('SELECT * FROM Reviews WHERE buyer_email = ?', username)
        # result = db.engine.execute(sql)
        # reviews = []
        # for row in result:
        #     reviews.append({'item_id' : row.item_id, 
        #                     'storefront_email' : row.storefront_email, 
        #                     'buyer_email' : row.buyer_email, 
        #                     'rating_item' : row.rating_item, 
        #                     'rating_storefront' : row.rating_storefront, 
        #                     'review' : row.review
        #     })
        # return jsonify({'reviews' : reviews})


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

