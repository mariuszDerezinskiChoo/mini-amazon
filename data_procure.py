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

    conn.execute("INSERT into item values (?,?,?,?)", (item_id,
                                                       row['Title'], str(row['Description']), row['Category']))

    for seller_pair in seller_pairs:
        company_name = str(row[seller_pair[0]])
        company_price = str(row[seller_pair[1]])
        if is_valid_string(company_name) and is_valid_string(company_price) and get_price(company_price):
            company_price = get_price(company_price)
            email = company_name + "@gmail.com"
            if email not in companies:
                password = lorem.sentence().replace(' ', '')[0:20]
                name = company_name
                balance = 1000
                description = lorem.sentence()
                conn.execute("INSERT into storefront values (?,?,?,?,?)",
                             (email, password, name, balance, description))
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
    conn.execute("INSERT into buyer values (?,?,?,?,?)",
                 (email, password, first_name, last_name, balance))

    for review in person['reviews']:
        rating_item = review['rating_item']
        rating_storefront = review['rating_storefront']
        review_text = review['review']
        time_submitted = review['timeSubmitted']

        storefront_email = storefront_list[review['storefrontIndex']]
        item_id = companies[storefront_email][np.random.randint(
            0, len(companies[storefront_email]))]
        conn.execute("INSERT into reviews values (?,?,?,?,?,?,?)", (item_id, storefront_email,
                                                                    email, time_submitted, rating_item, rating_storefront, review_text))
        continue
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
            price = 10
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
