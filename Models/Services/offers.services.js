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

async function createNewOffer(req) {
    const document = db.collection('offers').doc(req.params.offerId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Offer not found"}
    }

    return response;
}

async function updateOfferById(req) {
    const document = db.collection('offers').doc(req.params.offerId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Offer not found"}
    }

    return response;
}

async function deleteOfferById(req) {
    const document = db.collection('offers').doc(req.params.offerId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Offer not found"}
    }

    return response;
}

async function getOneOfferById(req) {
    const document = db.collection('offers').doc(req.params.offerId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Offer not found"}
    }

    return response;
}