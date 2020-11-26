const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const offers = [{ id: 1, title: 'test', author: 'test', price: '32131', city: 'Paname' }];

module.exports = {
    getAllOffers,
    getOneOfferById,
    createNewOffer,
    updateOfferById,
    deleteOfferById
};

async function getAllOffers() {
    return offers.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function createNewOffer() {
    return "201";
}

async function updateOfferById() {
    return "201";
}

async function deleteOfferById() {
    return "201";
}

async function getOneOfferById() {
    return "201";
}