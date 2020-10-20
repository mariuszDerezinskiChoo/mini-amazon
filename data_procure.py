import pandas as pd
import sqlite3
conn = sqlite3.connect('./database.db')

dataset = pd.read_csv("item_data.csv")
for index, row in dataset.iterrows():
    if '$' not in str(row['Price']):
        dataset.drop(index,inplace=True)
    # TODO: add other validation conditions

    # TODO: generate seller accounts based on row

for index, row in dataset.iterrows():
    c.execute("INSERT into item values (?,?,?,?)",row['Uniq id'],row['Category'],row['Title'],row['Description']))
    #TODO: insert rows into seller table

    #TODO: insert rows into Listing table

conn.commit()


dataset.to_csv("cleaned_data.csv")
