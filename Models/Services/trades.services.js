const db = require('../../utils/firebase');
const C = require('../../utils/Constant');
const responses = require("../../responses/messages");

module.exports = {
    getAllTrades,
    getOneTradeById,
    createNewTrade,
    updateTradeById,
    deleteTradeById
};

async function getAllTrades(req) {
    try {
        const data = db.collection('offers').doc(req.params.offerId).collection('trades');
        let response = [];
        await data.get().then(querySnapshot => {
            let trades = querySnapshot.docs;
            for (let trade of trades) {
                response.push(trade.data());
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

async function createNewTrade(req, res) {
    if(!req.body.trader_id){
        return res.status(400).json({ "code": 400, "message": "Bad request", "reason": "trader_id is required" });
    }
    if(!req.body.buyer_id){
        return res.status(400).json({ "code": 400, "message": "Bad request", "reason": "buyer_id is required" });
    }
    if(!req.body.type){
        return res.status(400).json({ "code": 400, "message": "Bad request", "reason": "type is required" });
    }

    await db.collection('offers').doc(req.params.offerId).collection('trades').add({
        trader_id: req.body.trader_id,
        buyer_id: req.body.buyer_id,
        status: C.STATUS_PENDING,
        value: req.body.value ? req.body.value : "",
        type: req.body.type,
        is_visible: true,
        date_of_trade: new Date(Date.now())
    }).then(result =>{
        db.collection('offers').doc(req.params.offerId).collection('trades').doc(result.id).update({
            id: result.id
        });
        return res.status(202).send(' Successfully created a new trade : ' + result.id);
    }).catch(e => {
        return res.status(409).json({ e });
    });
}

async function updateTradeById(req) {
    const document = db.collection('offers').doc(req.params.offerId).collection('trades').doc(req.params.tradeId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Trade not found"}
    }

    return response;
}

async function deleteTradeById(req, res) {
    const document = db.collection('offers').doc(req.params.offerId).collection('trades').doc(req.params.tradeId);
    if(!document) {
        return responses.errors(res, 404, {code:"Not Found", message: "Trade not found"}, "The trade with this id or with this offerId is not found");
    }
    await document.delete()
        .then(result => {
            return res.status(200).send('The trade was deleted with success !');
        })
        .catch(error => {
            return responses.errors(res, 500, {code:"Internal server error", message: "An unknown error was occurred"}, error.message);
        })
}

async function getOneTradeById(req, res) {
    const document = db.collection('offers').doc(req.params.offerId).collection('trades').doc(req.params.tradeId);
    let response = (await document.get()).data();

    if(!response){
        return responses.errors(res, 404, {code:"Not Found", message: "Trade not found"}, "The trade with this id or with this offerId is not found");
    }

    return response;
}
