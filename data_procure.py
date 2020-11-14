import pandas as pd
import sqlite3
import os
import re
from backend.api.models import Buyer
from backend.api import db, create_app
import math
import lorem
import numpy as np

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
    # TODO: add other validation conditions
    # TODO: generate seller accounts based on row
dataset = dataset.drop(indices)

item_id = 1
companies = set()
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
            if company_name not in companies:
                password = lorem.sentence().replace(' ', '')[0:20]
                name = company_name
                balance = 1000
                description = lorem.sentence()
                conn.execute("INSERT into storefront values (?,?,?,?,?)",
                             (email, password, name, balance, description))
                companies.add(company_name)
            quantity = np.random.randint(1, 100)
            conn.execute("INSERT into listing values (?,?,?,?)",
                         (item_id, quantity, company_price, email + "test"))

    item_id += 1

conn.commit()
print(item_id)
