const express = require("express");
const router = express.Router();
const tradeService = require("../Services/trades.services");

// routes
router.get("/:offerId/trades/", getAllTrades);
router.post("/:offerId/trades/", createNewTrade);
router.post("/:offerId/trades/:tradeId/accept", acceptTrade);
router.post("/:offerId/trades/:tradeId/refuse", refuseTrade);
router.get("/:offerId/trades/:tradeId", getOneTradeById);
router.patch("/:offerId/trades/:tradeId", updateTradeById);
router.delete("/:offerId/trades/:tradeId", deleteTradeById);

module.exports = router;

function getAllTrades(req, res, next) {
    tradeService
        .getAllTrades(req, res)
        .then((trades) => res.status(200).send(trades))
        .catch((err) => next(err));
}

function createNewTrade(req, res, next) {
    tradeService
        .createNewTrade(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

function updateTradeById(req, res, next) {
    tradeService
        .updateTradeById(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

function deleteTradeById(req, res, next) {
    tradeService
        .deleteTradeById(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

function getOneTradeById(req, res, next) {
    tradeService
        .getOneTradeById(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

function acceptTrade(req, res, next) {
    tradeService
        .acceptTrade(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

function refuseTrade(req, res, next) {
    tradeService
        .refuseTrade(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}