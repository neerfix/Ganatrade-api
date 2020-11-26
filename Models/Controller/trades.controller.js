const express = require("express");
const router = express.Router();
const tradeService = require("../Services/traders.services");

// routes
router.get("/", getAllTrades);
router.post("/", createNewTrade);
router.get("/:tradeId", getOneTradeById);
router.patch("/:tradeId", updateTradeById);
router.delete("/:tradeId", deleteTradeById);

module.exports = router;

function getAllTrades(req, res, next) {
    TradeService
        .getAll()
        .then((trades) => res.json(trades))
        .catch((err) => next(err));
}

function createNewTrade(req, res, next) {
    TradeService
        .getOneTradeById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function updateTradeById(req, res, next) {
    TradeService
        .getOneTradeById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function deleteTradeById(req, res, next) {
    TradeService
        .getOneTradeById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function getOneTradeById(req, res, next) {
    TradeService
        .getOneTradeById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}
