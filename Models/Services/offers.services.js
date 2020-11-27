const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../utils/firebase');

module.exports = {
    getAllOffers,
    getOneOfferById,
    createNewOffer,
    updateOfferById,
    deleteOfferById
};

async function getAllOffers() {
    try {
        const data = db.collection('offers');
        let response = [];
        await data.get().then(querySnapshot => {
            let offers = querySnapshot.docs;
            for (let offer of offers) {
                response.push(offer.data());
            }
        });
        return response;
    } catch (error) {
        return {
            "code": error.code,
            "message": error.message
        };
    }
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