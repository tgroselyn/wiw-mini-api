//server setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const shiftRouter = require('./routes/shift.router');
const userRouter = require('./routes/user.router');

//use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use cookie session to store user info (login status) for 15 minutes
app.use(cookieSession({
    name: 'session',
    keys: ['session'],
    maxAge: 15 * 60 * 1000
}));

//use routes
app.use('/api/shift', shiftRouter);
app.use('/user', userRouter);

//serve static files
app.use(express.static('build'));

//set port
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
