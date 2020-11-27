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
        .getAllTrades()
        .then((trades) => res.json(trades))
        .catch((err) => next(err));
}

function createNewTrade(req, res, next) {
    tradeService
        .getOneTradeById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function updateTradeById(req, res, next) {
    tradeService
        .getOneTradeById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function deleteTradeById(req, res, next) {
    tradeService
        .getOneTradeById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function getOneTradeById(req, res, next) {
    tradeService
        .getOneTradeById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}
