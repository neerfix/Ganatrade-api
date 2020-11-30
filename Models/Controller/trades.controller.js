const express = require("express");
const router = express.Router();
const tradeService = require("../Services/trades.services");

// routes
router.get("/", getAllTrades);
router.post("/", createNewTrade);
router.get("/:tradeId", getOneTradeById);
router.patch("/:tradeId", updateTradeById);
router.delete("/:tradeId", deleteTradeById);

module.exports = router;

function getAllTrades(req, res, next) {
    try {
        const data = db.collection('categories');
        let response = [];
        data.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                response.push(doc.data());
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

function createNewTrade(req, res, next) {
    tradeService
        .createNewTrade(req)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

function updateTradeById(req, res, next) {
    tradeService
        .updateTradeById(req)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

function deleteTradeById(req, res, next) {
    tradeService
        .deleteTradeById(req)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

function getOneTradeById(req, res, next) {
    tradeService
        .getOneTradeById(req)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}
