const db = require('../utils/firebase');

module.exports = {
    getAll,
    getOneById
}

function getAll () {
    return db.collection('users');
}

function getOneById (userId) {
    return db.collection('users').doc(userId);
}
