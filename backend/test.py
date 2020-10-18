from flask import Blueprint, jsonify, request
from api import db 
from api.models import Buyer
from sqlalchemy import text
    # This allows for plain SQL queries to be held in python variables
    # https://stackoverflow.com/questions/17972020/how-to-execute-raw-sql-in-flask-sqlalchemy-app
    # https://stackoverflow.com/questions/902408/how-to-use-variables-in-sql-statement-in-python

from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import models
import forms

app = Flask(__name__)
app.secret_key = 's3cr3t'
app.config.from_object('config')
db = SQLAlchemy(app, session_options={'autocommit': False})





# sql = text('SELECT DISTINCT category FROM item')

# This method means we manually manage each category-column displayed on the page
books_query = text('''
WITH itemavg AS (
    SELECT item_id, AVG(rating_item) AS average_score
    FROM Reviews
    GROUP BY item_id)
SELECT item_id, average_score
FROM item, itemavg
WHERE item.id = itemavg.item_id AND category = 'books'
ORDER BY average_score DESC
''')
    # .headers ON <- to see column names
books_table = db.engine.execute(books_query)
    # Returns a table of average rating per item in a category, sorted high-low
    # Books(item_id, average_score), high-low
print(row[0] for row in books_table)