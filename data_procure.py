import pandas as pd
import sqlite3
import os
import re
from backend.api.models import Buyer
from backend.api import db, create_app
import math
import lorem
import numpy as np
import json

with open('reviews.json') as f:
    reviews = json.load(f)
np.random.seed(316)

dataset = pd.read_csv("item_data.csv")

os.chdir("backend")
try:
    os.remove(os.path.join("api", "database.db"))
except FileNotFoundError as e:
    print("No database to delete")

db.create_all(app=create_app())

os.chdir("api")


# os.system("echo hello; python3 populatedb.py")

conn = sqlite3.connect('database.db')

indices = []
for index, row in dataset.iterrows():
    if '$' not in str(row['Price']):
        indices.append(index)
dataset = dataset.drop(indices)

item_id = 1
companies = {}
company_prices = {}
seller_pairs = [['Buybox Winner', 'Price'], ['Other Seller1', 'Other Seller1 Price'], [
    'Other Seller2', 'Other Seller2 Price'], ['Other Seller3', 'Other Seller3 Price']]


def is_valid_string(string):
    return not (string == None or string == 'nan' or str == '')


def get_price(string):
    potential_price = re.search("\d+\.\d+", row['Price'])
    if potential_price == None:
        return None
    return float(potential_price[0])


print("starting insertions")
for index, row in dataset.iterrows():
    if str(row['Description']) == None or str(row['Description']) == 'nan':
        row['Description'] = "This item does not have a description"

    if str(row['Category']) == None or str(row['Category']) == 'nan':
        row['Category'] = "Unknown"
    row['Category'] = row['Category'].split("›")[0].strip()

    image_url = ""
    if str(row['Image Url']) == None or str(row['Image Url']) == 'nan':
        image_url = "https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png"
    else:
        image_url = row['Image Url'].split('|')[0]
        image_url_list = image_url.split(".")
        image_url_list[-2] = '_SS200_'
        image_url = ".".join(image_url_list)
    conn.execute("INSERT into item values (?,?,?,?,?)", (item_id,
                                                         row['Title'], str(row['Description']), row['Category'], image_url))

    for seller_pair in seller_pairs:
        company_name = str(row[seller_pair[0]])
        company_price = str(row[seller_pair[1]])
        if 'seller-register-popover' in company_name:
            continue
        if is_valid_string(company_name) and is_valid_string(company_price) and get_price(company_price):
            company_price = get_price(company_price)

            company_prices[index] = company_price

            email = company_name + "@gmail.com"
            if email not in companies:
                password = lorem.sentence().replace(' ', '')[0:20]
                name = company_name
                balance = 1000
                description = lorem.sentence()
                conn.execute("INSERT into storefront values (?,?,?,?,?,?,?)",
                             (email, password, name, balance, description, "What color is the sky?", "blue"))
                companies[email] = []
            quantity = np.random.randint(1, 100)
            conn.execute("INSERT into listing values (?,?,?,?)",
                         (item_id, quantity, company_price, email))
            companies[email].append(item_id)

    item_id += 1

conn.commit()

storefront_list = list(companies.keys())
print(len(storefront_list))
print('Done inserting items, storefronts, and listings')
print('Inserting Buyers, cart, purchase, and reviews')
for person in reviews:
    first_name = person['firstName']
    last_name = person['lastName']
    email = person['email']
    password = person['password'].replace("-", "")[0:25]
    balance = person['balance']
    conn.execute("INSERT into buyer values (?,?,?,?,?,?,?)",  # TODO: fix
                 (email, password, first_name, last_name, balance, "What color is the sky?", "blue"))

    store_to_item = {}
    for review in person['reviews']:
        rating_item = review['rating_item']
        rating_storefront = review['rating_storefront']
        review_text = review['review']
        time_submitted = review['timeSubmitted']

        storefront_email = storefront_list[review['storefrontIndex']]

        if storefront_email not in store_to_item:
            store_to_item[storefront_email] = []

        item_id = companies[storefront_email][np.random.randint(
            0, len(companies[storefront_email]))]

        if item_id in store_to_item[storefront_email]:
            continue
        store_to_item[storefront_email].append(item_id)
        conn.execute("INSERT into reviews values (?,?,?,?,?,?)", (item_id, storefront_email,
                                                                  email, rating_item, rating_storefront, review_text))

    for purchase in person['purchase']:
        purchase_time = purchase['time']
        item_ids = []
        for item in purchase['items']:
            storefront_email = storefront_list[item['storefrontIndex']]
            item_id = companies[storefront_email][np.random.randint(
                0, len(companies[storefront_email]))]
            if item_id in item_ids:
                continue
            item_ids.append(item_id)
            quantity = item['quantity']
            price = company_prices.get(item_id, 10)
            conn.execute("INSERT into purchase values (?,?,?,?,?,?)",
                         (item_id, quantity, price, storefront_email, email, purchase_time))

    item_ids = []
    for cart in person['cart']:
        storefront_email = storefront_list[cart['storefrontIndex']]
        item_id = companies[storefront_email][np.random.randint(
            0, len(companies[storefront_email]))]
        if item_id in item_ids:
            continue
        item_ids.append(item_id)
        quantity = cart['quantity']
        conn.execute("INSERT into cart values (?,?,?,?)",
                     (item_id, quantity, storefront_email, email))

conn.commit()
print('Done inserting Buyers')
