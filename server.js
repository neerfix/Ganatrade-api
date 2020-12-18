require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('utils/jwt');
const errorHandler = require('utils/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api TODO REACTIVE IT
// app.use(jwt());

// api routes
app.use('/', require ('./Models/Controller/global.controller'));

// USER
app.use('/users', require('./Models/Controller/users.controller'));
app.use('/users/', require('./Models/Controller/Users/reviews.controller'));
app.use('/users/', require('./Models/Controller/Users/followings.controller'));

// OFFERS
app.use('/offers/', require('./Models/Controller/offers.controller'));
app.use('/offers/', require('./Models/Controller/trades.controller'));

// CATEGORIES
app.use('/categories', require('./Models/Controller/categories.controller'));

// FILTERS & SEARCH
app.use('/search', require('./Models/Controller/search.controller'));
app.use('/', require('./Models/Controller/Filters/offers.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 8888 : 8080;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
