from flask import Blueprint, jsonify, request
from . import db
from .models import Buyer, Storefront, Item, Listing, Cart, Purchase, Reviews
from sqlalchemy import text
from datetime import datetime
# This allows for plain SQL queries to be held in python variables
# https://stackoverflow.com/questions/17972020/how-to-execute-raw-sql-in-flask-sqlalchemy-app
# https://stackoverflow.com/questions/902408/how-to-use-variables-in-sql-statement-in-python

main = Blueprint('main', __name__)


@main.route('/home')
def home():
    res = db.engine.execute('With a as (Select AVG(rating_item) as rating, r.storefront_email, r.item_id from reviews r group by r.item_id, r.storefront_email order by rating DESC LIMIT 20), b as (Select * from a inner join listing on a.item_id = listing.item_id and a.storefront_email = listing.storefront_email), c as (Select * from b inner join item on b.item_id = item.id) Select *, c.name as bname, storefront.name as sellername from c inner join storefront where c.storefront_email = storefront.email;')
    recs = []
    for row in res:
        recs.append({
            "id": row.item_id,
            "seller": row.sellername,
            "name": row.bname,
            "price": row.price,
            "quantity": row.quantity,
            "selleremail": row.storefront_email,
            'photo': row.photo_url
        })

    return jsonify({'recs': recs})


@main.route('/add_buyer', methods=['POST'])
def add_buyer():
    buyer_data = request.get_json()

    new_buyer = Buyer(email=buyer_data['email'],
                      password=buyer_data['password'],
                      first_name=buyer_data['first_name'],
                      last_name=buyer_data['last_name'],
                      balance=buyer_data['balance'],
                      security_question=buyer_data['security_question'],
                      security_answer=buyer_data['security_answer'],
                      )
    db.session.add(new_buyer)
    db.session.commit()
    return 'Buyer Added'


@main.route('/buyers', methods=['GET', 'POST'])
def buyers():
    if request.method == 'POST':
        req = request.json
        buyer_email = req['email']
        buyer_password = req['password']
        buyer_info = []
        buyer = db.engine.execute('SELECT email, first_name, balance, last_name, password FROM Buyer WHERE Buyer.email = "{}" AND Buyer.password = "{}";'.format(
            buyer_email, buyer_password))
        for b in buyer:
            buyer_info.append({'email': b.email,
                               'first_name': b.first_name,
                               'last_name': b.last_name,
                               'balance': b.balance,
                               'password': b.password})
        return jsonify({'buyer_detail': buyer_info})

    if request.method == 'GET':
        buyer_list = Buyer.query.all()
        buyers = []

        for buyer in buyer_list:
            buyers.append({'email': buyer.email,
                           'first_name': buyer.first_name,
                           'last_name': buyer.last_name,
                           'balance': buyer.balance,
                           'password': buyer.password})

        return jsonify({'buyers': buyers})


@main.route('/buyerseditpassword', methods=['POST'])
def buyersedit():
    req = request.json
    buyer_email = req['email']
    buyer_new_password = req['newPass']
    db.engine.execute('UPDATE Buyer SET password = "{}" where email = "{}";'.format(
        buyer_new_password, buyer_email))
    return 'Password Updated'


@main.route('/buyerseditprofile', methods=['POST'])
def buyerseditprofile():
    req = request.json
    buyer_email = req['email']
    buyer_new_password = req['newPass']
    buyer_first_name = req['first_name']
    buyer_last_name = req['last_name']
    db.engine.execute('UPDATE Buyer SET password = "{}" where email = "{}";'.format(
        buyer_new_password, buyer_email))
    db.engine.execute('UPDATE Buyer SET first_name = "{}" where email = "{}";'.format(
        buyer_first_name, buyer_email))
    db.engine.execute('UPDATE Buyer SET last_name = "{}" where email = "{}";'.format(
        buyer_last_name, buyer_email))
    return 'Profile Updated'


@main.route('/buyerssecurity', methods=['POST'])
def buyerssecurity():
    req = request.json
    buyersecurity_email = req['email']
    buyersecurity_info = []
    buyer_security = db.engine.execute(
        'SELECT b.email, b.password, b.security_question, b.security_answer FROM Buyer b WHERE b.email = "{}";'.format(buyersecurity_email))
    for i in buyer_security:
        buyersecurity_info.append({'email': i.email,
                                   'password': i.password,
                                   'security_question': i.security_question,
                                   'security_answer': i.security_answer})
    return jsonify({'buyer_security': buyersecurity_info})


@main.route('/storefronts', methods=['GET', 'POST'])
def storefronts():
    if request.method == 'POST':
        req = request.json
        storefront_email = req['email']
        storefront_password = req['password']
        storefront_info = []
        storefront = db.engine.execute('SELECT s.email, s.name, s.balance, s.description, s.password FROM Storefront s WHERE s.email = "{}" and s.password = "{}";'.format(
            storefront_email, storefront_password))
        for s in storefront:
            storefront_info.append({'email': s.email,
                                    'name': s.name,
                                    'description': s.description,
                                    'balance': s.balance,
                                    'password': s.password})
        return jsonify({'storefronts': storefront_info})

    if request.method == 'GET':
        storefront_list = Storefront.query.all()
        storefronts = []

        for storefront in storefront_list:
            storefronts.append({'email': storefront.email,
                                'name': storefront.name,
                                'description': storefront.description,
                                'balance': storefront.balance,
                                'password': storefront.password})

        return jsonify({'storefronts': storefronts})


@main.route('/add_storefront', methods=['POST'])
def add_storefront():
    storefront_data = request.get_json()

    new_storefront = Storefront(email=storefront_data['email'],
                                password=storefront_data['password'],
                                name=storefront_data['name'],
                                description=storefront_data['description'],
                                security_question=storefront_data['security_question'],
                                security_answer=storefront_data['security_answer'],
                                balance=storefront_data['balance'],
                                )
    db.session.add(new_storefront)
    db.session.commit()
    return 'Storefront added'


@main.route('/storefrontssecurity', methods=['POST'])
def storefrontssecurity():
    req = request.json
    storefrontsecurity_email = req['email']
    storefrontsecurity_info = []
    storefront_security = db.engine.execute(
        'SELECT s.email, s.password, s.security_question, s.security_answer FROM Storefront s WHERE s.email = "{}";'.format(storefrontsecurity_email))
    for i in storefront_security:
        storefrontsecurity_info.append({'email': i.email,
                                        'password': i.password,
                                        'security_question': i.security_question,
                                        'security_answer': i.security_answer})
    return jsonify({'storefront_security': storefrontsecurity_info})


@main.route('/storefrontseditpassword', methods=['POST'])
def storefrontsedit():
    req = request.json
    storefront_email = req['email']
    storefront_new_password = req['newPass']
    db.engine.execute('UPDATE Storefront SET password = "{}" where email = "{}";'.format(
        storefront_new_password, storefront_email))
    return 'Done'


@main.route('/storefrontseditprofile', methods=['POST'])
def storefrontseditprofile():
    req = request.json
    storefront_email = req['email']
    storefront_new_password = req['newPass']
    storefront_name = req['name']
    storefront_description = req['description']
    db.engine.execute('UPDATE Storefront SET password = "{}" where email = "{}";'.format(
        storefront_new_password, storefront_email))
    db.engine.execute('UPDATE Storefront SET name = "{}" where email = "{}";'.format(
        storefront_name, storefront_email))
    db.engine.execute('UPDATE Storefront SET description = "{}" where email = "{}";'.format(
        storefront_description, storefront_email))
    return 'Profile Updated'


@main.route('/cart', methods=['GET'])
def cart():
    req = request.args
    buyer = req.get("buyerEmail")
    query_text = """select i.photo_url, i.name, i.description, i.category, l.price, c.quantity, c.item_id, s.name as sellername, s.email as selleremail, i.id as item_id
                    from item i, listing l, cart c, storefront s
                    where c.buyer_email = ? and c.item_id = l.item_id and i.id = l.item_id and c.storefront_email = l.storefront_email and s.email = l.storefront_email;"""
    res = db.engine.execute(query_text, (buyer))
    response = []
    for row in res:
        response.append({
            "itemId": row.item_id,
            "itemName": row.name,
            "sellerName": row.sellername,
            "price": row.price,
            "quantity": row.quantity,
            "sellerEmail": row.selleremail,
            "imageUrl": row.photo_url,
            "description": row.description
        })
    return jsonify(response)


@main.route('/purchase-cart', methods=['POST'])
def purchase_cart():
    req = request.json
    now = datetime.now()
    now_format = now.strftime("%Y%m%d %H:%M:%S %p")
    connection = db.engine.connect()
    transaction = connection.begin()
    email = req["email"]
    query_text = """select i.photo_url, i.name, i.description, i.category, l.price, c.quantity, c.item_id, s.name as sellername, s.email as selleremail, i.id as item_id
                    from item i, listing l, cart c, storefront s
                    where c.buyer_email = ? and c.item_id = l.item_id and i.id = l.item_id and c.storefront_email = l.storefront_email and s.email = l.storefront_email;"""
    # calculate total cost
    res = connection.execute(query_text, (email))
    total_cost = 0
    for row in res:
        listing_cost = row.quantity * row.price
        total_cost += listing_cost
        connection.execute("INSERT into purchase values (?,?,?,?,?,?)", (
            row.item_id, row.quantity, row.price, row.selleremail, email, now_format))

        listing_quantity = connection.execute(
            "select * from listing where storefront_email=? and item_id=?", (row.selleremail, row.item_id)).fetchone().quantity
        if listing_quantity < row.quantity:
            transaction.rollback()
            connection.close()
            return "Error: not enough in stock for item {}".format(row.name)
        new_listing_quantity = listing_quantity - row.quantity
        connection.execute("UPDATE listing SET quantity = ? WHERE storefront_email=? and item_id=?",
                           (new_listing_quantity, row.selleremail, row.item_id))

        seller_balance = connection.execute(
            "select * from storefront where email=?", (row.selleremail)).fetchone().balance
        new_seller_balance = seller_balance + listing_cost
        connection.execute(
            "UPDATE storefront SET balance = ? WHERE email = ?", (new_seller_balance, row.selleremail))

    # get current money
    res = connection.execute("select * from buyer where email=?", (email))
    balance = res.fetchone().balance
    print("{} {} here".format(balance, total_cost))
    if(balance < total_cost):
        transaction.rollback()
        connection.close()
        return "Error: insufficient funds to complete your transaction. Please add to your account balance"
    else:
        new_balance = balance - total_cost
        connection.execute(
            "UPDATE buyer SET balance = ? WHERE email = ?", (new_balance, email))
        connection.execute("delete from cart where buyer_email=?", (email))
        transaction.commit()
        return "Success! Your items have been purchased"
    # if enough money, 1) subtract money 2) add items to purchase history 3) remove items from cart 4) add balance to buyer


@ main.route('/addBalance', methods=['POST'])
def update_balance():
    req = request.json

    adding = req['adding']
    email = req["email"]
    print(email)
    res = db.engine.execute(
        'SELECT balance from buyer where email= ?', (email))
    balance = res.fetchone()[0]

    new_balance = balance + adding

    db.engine.execute(
        "UPDATE buyer SET balance = ? WHERE email = ?", (new_balance, email))

    db.session.commit()
    response = {
        'newBalance': new_balance
    }
    return jsonify(response)


@ main.route('/getbalance', methods=['GET'])
def get_balance():
    req = request.args
    email = req.get("email")
    res = db.engine.execute(
        'SELECT balance from buyer where email= ?', (email))
    balance = res.fetchone()[0]
    response = {
        'balance': balance
    }
    return jsonify(response)


@ main.route('/getTradeHistory')
def get_trade_history():
    req = request.args
    email = req.get("email")
    query = """
    select p.item_id, i.photo_url, i.name, p.price, p.quantity, b.first_name, b.last_name, p.datetime
    from item i, purchase p, buyer b
    where i.id = p.item_id and p.buyer_email = b.email and p.storefront_email = ?
    order by p.datetime desc;
    """
    res = db.engine.execute(
        query, (email))
    response = []
    for row in res:
        response.append({
            "itemId": row.item_id,
            "itemName": row.name,
            "price": row.price,
            "quantity": row.quantity,
            "firstName": row.first_name,
            "lastName": row.last_name,
            "time": row.datetime,
            "imageUrl": row.photo_url,
        })
    return jsonify(response)


@ main.route('/getOrderHistory')
def get_order_history():
    req = request.args
    email = req.get("email")
    print(email)
    query = """
    select p.item_id, i.photo_url, i.name, p.price, p.quantity, s.name, p.datetime
    from item i, purchase p, storefront s
    where i.id = p.item_id and p.storefront_email = s.email and p.buyer_email = ?
    order by p.datetime desc;
    """
    res = db.engine.execute(
        query, (email))
    response = []
    for row in res:
        response.append({
            "itemId": row.item_id,
            "itemName": row.name,
            "price": row.price,
            "quantity": row.quantity,
            "name": row.name,
            "time": row.datetime,
            "imageUrl": row.photo_url,
        })
    return jsonify(response)


@ main.route('/add_cart', methods=['POST'])
def add_cart():
    cart_data = request.get_json()
    print(cart_data)
    new_cart = Cart(item_id=cart_data['id'],
                    quantity=cart_data['quantity'],
                    storefront_email=cart_data['selleremail'],
                    buyer_email=cart_data['buyeremail'],
                    )

    db.session.add(new_cart)
    db.session.commit()

    return 'Done', 201


@ main.route('/updateCart', methods=['POST'])
def update_cart():
    req = request.json
    buyer_email = req['buyerEmail']
    item_id = req['itemId']
    seller_email = req['sellerEmail']
    new_quantity = req['quantity']
    # todo: validate size
    db.engine.execute('UPDATE cart SET quantity = {} where storefront_email = "{}" and item_id = "{}" and buyer_email = "{}";'.format(
        new_quantity, seller_email, item_id, buyer_email))

    return 'Done', 201


@ main.route('/seller/<email>', methods=['POST', 'PUT', 'GET'])
def seller(email):
    if request.method == 'POST':
        req = request.json
        new_item = Item(
            name=req['name'], description=req['item_desc'], category=req['category'], photo_url=req['picture'])
        db.session.add(new_item)
        db.session.commit()
        item = Item.query.filter_by(
            name=req['name'], description=req['item_desc']).first()
        item_id = item.id
        new_listing = Listing(item_id=item_id, quantity=req['quantity'], price=req['price'],
                              storefront_email=email)
        db.session.add(new_listing)
        db.session.commit()

        return 'new item submitted'
    elif request.method == 'PUT':
        req = request.json
        item = Item.query.filter_by(id=req['id']).first()
        listing = Listing.query.filter_by(
            item_id=req['id'], storefront_email=email).first()
        seller = Storefront.query.filter_by(
            email=email).first()

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
        listings_list = []
        listings = Listing.query.filter_by(
            storefront_email=email).all()
        seller = Storefront.query.filter_by(
            email=email).first()
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
            data['picture'] = item.photo_url

            listings_list.append(data)
        return jsonify({'listings': listings_list})


@main.route('/review/', methods=['GET', 'PUT', 'POST'])
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
        # DB QUERY
        req = request.json

        # These three PK values can't be changed on the frontend, so this will always find the intended tuple
        review = Reviews.query.filter_by(
            item_id=req['item_id'], storefront_email=req['storefront_email'], buyer_email=req['buyer_email']).first()

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
        req = request.args
        username = req.get("buyerEmail")
        reviews = Reviews.query.filter_by(buyer_email=username).all()

        reviews_list = []

        # username = login_session_username... (e.g., buyer_email1@gmail.com)
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

        return jsonify({'reviews_endpt': reviews_list})

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


@main.route('/delete_listing/<email>', methods=['POST'])
def delete_listing(email):
    req = request.json
    print(req)
    print(req['id'])
    # TODO: make this seller specific
    listing = Listing.query.filter_by(
        item_id=req['id'], storefront_email=email).first()
    db.session.delete(listing)
    db.session.commit()

    return 'listing deleted'


@main.route('/listings/<search>')
def listings(search):
    text = search
    res = db.engine.execute(
        'SELECT i.id, i.name, i.photo_url, l.quantity, l.price, s.name as sellername FROM item i, listing l, storefront s WHERE i.name LIKE "%{}%" and i.id = l.item_id and l.storefront_email = s.email;'.format(text))
    listings = []
    for row in res:
        listings.append({
            "id": row.id,
            "name": row.name,
            "price": row.price,
            "quantity": row.quantity,
            "seller": row.sellername,
            "photo": row.photo_url
        })
    if not listings:
        return jsonify(listings)

    return jsonify({'listings': listings})


@main.route('/item/<seller>/<item_id>')
def item(seller, item_id):
    res = db.engine.execute('WITH a AS (Select * from item inner join listing on item.id=listing.item_id where item.id= {}), b AS (SELECT a.photo_url, a.item_id, a.name, a.description, a.category, a.storefront_email, a.price, a.quantity, s.name as sellername FROM a INNER JOIN storefront s ON a.storefront_email = s.email) SELECT * FROM b WHERE sellername = "{}";'.format(item_id, seller))
    items = []
    for row in res:
        items.append({
            "id": row.item_id,
            "name": row.name,
            "description": row.description,
            "category": row.category,
            "selleremail": row.storefront_email,
            "seller": row.sellername,
            "price": row.price,
            "quantity": row.quantity,
            "reviews": [],
            "photo": row.photo_url
        })
    semail = items[0]["selleremail"]
    rate = db.engine.execute(
        'SELECT COUNT(*) as total, AVG(rating_item) as rating, r.buyer_email, r.rating_item, r.review FROM reviews r WHERE r.item_id = {} and r.storefront_email = "{}";'.format(item_id, semail))
    rate2 = db.engine.execute(
        'SELECT * FROM reviews r WHERE r.item_id = {} and r.storefront_email = "{}";'.format(item_id, semail))
    for row in rate:
        for item in items:
            item["avg_rating"] = row.rating
            item["total_reviews"] = row.total

    for row in rate2:
        for item in items:
            item["reviews"].append(
                {"email": row.buyer_email, "rating": row.rating_item, "review": row.review})

    return jsonify({'items': items})
