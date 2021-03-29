require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./functions/src/utils/jwt');
const errorHandler = require('./functions/src/utils/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.use(jwt());
// use JWT auth to secure the api

// api routes
app.use('/', require ('./functions/src/Controller/global.controller'));

// USER
app.use('/users', require('./functions/src/Controller/Users/users.controller'));
app.use('/users/', require('./functions/src/Controller/Users/reviews.controller'));
app.use('/users/', require('./functions/src/Controller/Users/followings.controller'));

// OFFERS
app.use('/offers/', require('./functions/src/Controller/Offers/offers.controller'));
app.use('/offers/', require('./functions/src/Controller/Offers/trades.controller'));

// CATEGORIES
app.use('/categories', require('./functions/src/Controller/categories.controller'));

// FILTERS & SEARCH
app.use('/search', require('./functions/src/Controller/Filters/search.controller'));
app.use('/', require('./functions/src/Controller/Filters/offers.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 3000 : 80;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
