"""import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# Create some test data for our catalog in the form of a list of dictionaries.
users = [
    {'email': 'karoline.xiong@duke.edu',
    'password': 123,
    'first_name': 'Karoline',
     'last_name': 'Xiong',
     'balance': '100.00',
     },
     {'email': 'robert.chen@duke.edu',
    'password': 456,
    'first_name': 'Robert',
     'last_name': 'Chen',
     'balance': '100.00',
     },
    {'email': 'justin.du@duke.edu',
    'password': 789,
    'first_name': 'Justin',
     'last_name': 'Du',
     'balance': '100.00',
     },
]

@app.route('/', methods=['GET'])
def home():
    return '''<h1>homepage test</h1>
<p>A prototype API </p>'''


@app.route('/api/v1/users/all', methods=['GET'])
def api_all():
    return jsonify(users)


@app.route('/api/v1/users', methods=['GET'])
def api_id():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."

    # Create an empty list for our results
    results = []

    # Loop through the data and match results that fit the requested ID.
    # IDs are unique, but other fields might return many results
    for user in users:
        if user['id'] == id:
            results.append(user)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)
app.run()
"""