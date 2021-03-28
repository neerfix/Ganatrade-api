require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('src/utils/jwt');
const errorHandler = require('src/utils/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/', require ('./src/Controller/global.controller'));

// USER
app.use('/users', require('./src/Controller/Users/users.controller'));
app.use('/users/', require('./src/Controller/Users/reviews.controller'));
app.use('/users/', require('./src/Controller/Users/followings.controller'));

// OFFERS
app.use('/offers/', require('./src/Controller/Offers/offers.controller'));
app.use('/offers/', require('./src/Controller/Offers/trades.controller'));

// CATEGORIES
app.use('/categories', require('./src/Controller/categories.controller'));

// FILTERS & SEARCH
app.use('/search', require('./src/Controller/Filters/search.controller'));
app.use('/', require('./src/Controller/Filters/offers.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 3000 : 80;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
