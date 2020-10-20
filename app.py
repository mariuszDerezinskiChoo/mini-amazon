from flask import Flask, render_template, redirect, url_for, request, session, flash
from flask_sqlalchemy import SQLAlchemy
from forms import ItemSearchForm
from hello import app
from models import db, Item

#from db_setup import init_db, db_session

##app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///item.db'
#app.secret_key = "abcd"
#app.permanent_session_lifetime = timedelta(minutes = 2)

#db = SQLAlchemy(app)

#init_db()

@app.route("/", methods= ["POST", "GET"])
def login():
    if request.method == "POST" :
        user = request.form["nm"]
        session["user"]= user
        return redirect(url_for("search"))
    else:
        if "user" in session:
            return redirect(url_for("search"))
        return render_template("login.html")

@app.route("/search", methods= ['GET', 'POST'])
def search():
    if "user" in session:
        user = session["user"]
    else:
        return redirect(url_for("login"))
    search = ItemSearchForm(request.form)
    if request.method == 'POST':
        return search_results(search)
    return render_template('idx.html', form=search, usr= user)

@app.route('/results')
def search_results(search):
    results = []
    search_string = search.data["search"]
    if search_string != '':
        qry= Item.query.filter_by(name = search_string)
        results = qry
    if results.count() == 0 :
        flash('No results found!')
        return redirect('/')
    else:
        return render_template('results.html', results= results)

@app.route("/user")
def user():
    if "user" in session:
        user = session["user"]
        q= Item.query.filter_by(name = 'Harry Potter').all()
        return render_template("harry.html")
    else:
        return redirect(url_for("login"))


@app.route("/admin")
def admin():
    return redirect(url_for("home"))

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)

