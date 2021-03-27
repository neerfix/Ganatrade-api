const express = require("express");
const router = express.Router();
const tradeService = require("../../Services/Offers/trades.services");

// routes /offers/

router.get("/:offerId/trades/", getAllTrades);
function getAllTrades(req, res, next) {
    tradeService
        .getAllTrades(req, res)
        .then((trades) => res.status(200).send(trades))
        .catch((err) => next(err));
}

router.post("/:offerId/trades/", createNewTrade);
function createNewTrade(req, res, next) {
    tradeService
        .createNewTrade(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

router.patch("/:offerId/trades/:tradeId", updateTradeById);
function updateTradeById(req, res, next) {
    tradeService
        .updateTradeById(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

router.delete("/:offerId/trades/:tradeId", deleteTradeById);
function deleteTradeById(req, res, next) {
    tradeService
        .deleteTradeById(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

router.get("/:offerId/trades/:tradeId", getOneTradeById);
function getOneTradeById(req, res, next) {
    tradeService
        .getOneTradeById(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

router.post("/:offerId/trades/:tradeId/accept", acceptTrade);
function acceptTrade(req, res, next) {
    tradeService
        .acceptTrade(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

router.post("/:offerId/trades/:tradeId/refuse", refuseTrade);
function refuseTrade(req, res, next) {
    tradeService
        .refuseTrade(req, res)
        .then((trade) => res.status(200).send(trade))
        .catch((err) => next(err));
}

module.exports = router;
