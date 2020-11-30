const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../utils/firebase');

// users hardcoded for simplicity, store in a db for production applications
const trades = [{ id: 1, username: 'Antoine', password: 'jesuisunmotdepasse', firstName: 'oui', lastName: 'non' }];

module.exports = {
    getAllTrades,
    getOneTradeById,
    createNewTrade,
    updateTradeById,
    deleteTradeById
};

async function getAllTrades(req) {
    try {
        const data = db.collection('users');
        let response = [];
        await data.get().then(querySnapshot => {
            let users = querySnapshot.docs;
            for (let user of users) {
                response.push(user.data());
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

async function createNewTrade(req) {
    const document = db.collection('offers').doc(req.params.offerId).collection('trades').doc(req.params.tradeId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Trade not found"}
    }

    return response;
}

async function updateTradeById(req) {
    const document = db.collection('offers').doc(req.params.offerId).collection('trades').doc(req.params.tradeId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Trade not found"}
    }

    return response;
}

async function deleteTradeById(req) {
    const document = db.collection('offers').doc(req.params.offerId).collection('trades').doc(req.params.tradeId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Trade not found"}
    }

    return response;
}

async function getOneTradeById(req) {
    const document = db.collection('offers').doc(req.params.offerId).collection('trades').doc(req.params.tradeId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Trade not found"}
    }

    return response;return "201";
}
