
from flask import Blueprint, jsonify, request
from . import db 
from .models import User, Item, Selling

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