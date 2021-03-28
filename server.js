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

<<<<<<< HEAD
<<<<<<< Updated upstream
// use JWT auth to secure the api TODO REACTIVE IT
=======
// use JWT auth to secure the api
>>>>>>> Stashed changes
// app.use(jwt());
=======
// use JWT auth to secure the api
app.use(jwt());
>>>>>>> 19af0bde9b409ec2cde89f6dc213f10dfe55bc30

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
const port = process.env.NODE_ENV === 'production' ? 80 : 80;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
