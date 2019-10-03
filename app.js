const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Mongo
if (typeof process.env.MongoURI == 'undefined') {
    console.log('MongoURI is not set in the .env file!');
    return;
}

mongoose.connect(process.env.MongoURI, { useNewUrlParser: true })
    .then(() => console.log('DB connected...'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3003;
app.listen(PORT, console.log('Server started...'));