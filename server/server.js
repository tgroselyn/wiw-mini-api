//server setup
const express = require('express');
const app = express();
const shiftRouter = require('./routes/shift.router.js');

//use body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api/shift', shiftRouter);

//serve static files
app.use(express.static('build'));

//set port
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
