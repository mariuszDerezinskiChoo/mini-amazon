# Mini Amazon

## MS2 Submission

MS2 deliverables can be found in the root directory of the repository as MS2.mp4 and MS2.pdf

## Frontend

The frontend is written in react. to run locally:

```shell
cd ./frontend/mini-amazon/
npm install
npm start
```

then you can access the site from https://localhost:3000 (after you have started the backend as well)

## Backend

The backend is written in python with the Flask Framework. To run locally:

```shell
pip3 install flask && pip3 install flask_sqlalchemy && pip3 install flask_cors
cd ./backend
. venv/bin/activate
cd api
export FLASK_APP=__init__.py
export FLASK_DEBUG=1
flask run
```
