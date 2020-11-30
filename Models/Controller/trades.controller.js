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
    tradeService
        .getAllTrades(req)
        .then((trades) => res.status(200).send(trades))
        .catch((err) => next(err));
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
