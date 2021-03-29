const tradeService = require("../../Services/Offers/trades.services");
const Http_response = require("../../utils/http-response");

module.exports = {
    getAllTrades: (req, res, next) => {
        tradeService
            .getAllTrades(req, res)
            .then((trades) => res.status(200).send(trades))
            .catch((err) => next(err));
    },
    createNewTrade: (req, res, next) => {
        if (!req.body.trader_id) {
            Http_response.HTTP_400(req, res, next, 'trader_id')
        }

        if (!req.body.buyer_id) {
            Http_response.HTTP_400(req, res, next, 'buyer_id')
        }

        if (!req.body.type) {
            Http_response.HTTP_400(req, res, next, 'type')
        }

        tradeService
            .createNewTrade(req, res)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => next(err));
    },
    updateTradeById: (req, res, next) => {
        tradeService
            .updateTradeById(req, res)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => next(err));
    },
    deleteTradeById: (req, res, next) => {
        tradeService
            .deleteTradeById(req, res)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => next(err));
    },
    getOneTradeById: (req, res, next) => {
        tradeService
            .getOneTradeById(req, res)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => next(err));
    },
    acceptTrade: (req, res, next) => {
        tradeService
            .acceptTrade(req, res)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => next(err));
    },
    refuseTrade: (req, res, next) => {
        tradeService
            .refuseTrade(req, res)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => next(err));
    }
}
