# When I Work Mini API

### Built by Thomas Roselyn

This mini API and front-end application were built as a code challenge for When I Work.

## Built With

React, Node, Express, and PostgreSQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgresQL](https://www.postgresql.org/)
- [Postico](https://eggerapps.at/postico/)

### Installing

Steps to get the development environment running:

1. Fork and clone this project.
2. Set up a local PostgreSQL database called `wheniwork_mini_api`
3. Use the database.sql instructions to create a table in your database
4. In the terminal, `npm install` in the project folder
5. In the terminal, `npm run server` and `npm run client`
6. Import the postman.json file into Postman for testing routes
    - log in to '/user/login' with username "Manager" to get protected routes to work.

## Documentation

### Completed Features

API includes two routes

user.router.js
- [x] POST route for logging in as "Employee" or "Manager"
    - required fields:
        - "username" : <string>
- [x] GET route for getting back logged in user

shift.router.js
- [x] DELETE route for deleting all shifts from the database (protected)
- [x] GET route for getting all shifts back from the database
- [x] POST route for adding a new shift (protected, uses overlap module)
    - required fields:
        - "start": <date string> (i.e. "2019/06/11 06:30:00")
	    - "end": "<date string>"
	    - "title": <string>

Overlap module checks for overlapping shifts before allowing the POST to complete.

The API uses cookie-session as it's auth method. I wanted an extremely lightweight and unobtrusive way to protect the routes. While all it requires to log in is selecting a value from a dropdown, I just wanted to show this could be done. I have used passport.js in other projects for auth and while it's great, it requires a lot more set up.

I also wanted to avoid using Redux in this project (again to keep it easy to digest), so I'm utilizing local state in several components, passing props, and using axios directly in my component methods. For larger-scale projects, I have used Redux Sagas to retrieve and manipulate my stored data, and have written unit tests for my reducers.

The calendar used is react-big-calendar, which I'm working with for the first time, so considering this a victory.

Minimal styling applied just to make it look a little more legible and When-I-Work-like.

Postman file is included for testing.
