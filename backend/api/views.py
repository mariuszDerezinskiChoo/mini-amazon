
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