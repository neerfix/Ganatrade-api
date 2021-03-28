const db = require('../utils/firebase');

module.exports = {
    getAll,
    getOneById
}

function getAll () {
    return db.collection('offers');
}

function getOneById (offerId) {
    return db.collection('offers').doc(offerId);
}
