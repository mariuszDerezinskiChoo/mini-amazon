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
        



        # OR IS THIS BELOW CODE FOR "GET" REQUEST?
        # username = login_session_username... (e.g., buyer_email1@gmail.com)
        username = "buyer_email1@gmail.com"
        sql = text('SELECT * FROM Reviews WHERE buyer_email = ?', username)
        result = db.engine.execute(sql)
        reviews = []
        for row in result:
            reviews.append({'item_id' : row.item_id, 
                            'storefront_email' : row.storefront_email, 
                            'buyer_email' : row.buyer_email, 
                            'rating_item' : row.rating_item, 
                            'rating_storefront' : row.rating_storefront, 
                            'review' : row.review
            })
        return jsonify({'reviews' : reviews})

    else: # FROM ROBERT'S SELLER PAGE, THIS IS FOR LISTINGS
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

