const tradeService = require("../../Services/Offers/trades.services");
const Http_response = require("../../utils/http-response");

module.exports = {
    getAllTrades: (req, res,  db) => {
        tradeService
            .getAllTrades(req, res, db)
            .then((trades) => res.status(200).send(trades))
            .catch((err) => err);
    },
    createNewTrade: (req, res,  db) => {
        if (!req.body.trader_id) {
            Http_response.HTTP_400(req, res,  'trader_id')
        }

        if (!req.body.buyer_id) {
            Http_response.HTTP_400(req, res,  'buyer_id')
        }

        if (!req.body.type) {
            Http_response.HTTP_400(req, res,  'type')
        }

        tradeService
            .createNewTrade(req, res, db)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => err);
    },
    updateTradeById: (req, res,  db) => {
        tradeService
            .updateTradeById(req, res, db)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => err);
    },
    deleteTradeById: (req, res,  db) => {
        tradeService
            .deleteTradeById(req, res, db)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => err);
    },
    getOneTradeById: (req, res,  db) => {
        tradeService
            .getOneTradeById(req, res, db)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => err);
    },
    acceptTrade: (req, res,  db) => {
        tradeService
            .acceptTrade(req, res, db)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => err);
    },
    refuseTrade: (req, res,  db) => {
        tradeService
            .refuseTrade(req, res, db)
            .then((trade) => res.status(200).send(trade))
            .catch((err) => err);
    }
}
