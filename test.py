from app import app
from db_setup import init_db

init_db()

@app.route('/test')
def test():
    return "Welcome to Flask!"
    
if __name__ == '__main__':
    app.run()
