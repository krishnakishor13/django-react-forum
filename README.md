# TECH I.S. Job Support System

```
Forum App, with a frontend built in React & Redux and a backend built in Django API.
```

## Live Demo



Check out [FRONTEND LIVE DEMO](https://frontend-job-support-system.herokuapp.com/) here!!

Check out [API LIVE DEMO](https://backend-job-support-system.herokuapp.com/) here!!

## Tech used

```
* Frontend : React & Redux
* Backend : Django
```

## How to Install

1. Git Clone

```
git clone git@github.com:Tech-i-s/techis-job-support-system.git
```

2. Backend setting

```
cd backend
Python -m venv env
(For Mac) source env/bin/activate
(For Windows) env/Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
# Open http://127.0.0.1:8000/posts/

# To have dummy data for testing run:
python manage.py fixtures/dummy-data.json
```

3. Frontend setting

```
cd frontend
npm install
npm start
# Open http://127.0.0.1:3000/
```
