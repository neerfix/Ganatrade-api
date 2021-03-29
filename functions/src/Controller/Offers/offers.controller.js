const OffersService = require("../../Services/Offers/offers.services");
const Http_response = require("../../utils/http-response");

// routes -> /offers/
module.exports = {
    getAllOffers: (req, res,  db) => {
        OffersService
            .getAllOffers(req, res, db)
            .then((offers) => res.status(200).send(offers))
            .catch((err) => err);
    },
    createNewOffer: (req, res,  db) => {
        if(!req.body.user_id) {
            Http_response.HTTP_400(req, res,  'user_id')
        }

        if(!req.body.title) {
            Http_response.HTTP_400(req, res,  'title')
        }

        if(!req.body.product.name) {
            Http_response.HTTP_400(req, res,  'name')
        }

        if(!req.body.product.condition) {
            Http_response.HTTP_400(req, res,  'condition')
        }

        if(!req.body.category) {
            Http_response.HTTP_400(req, res,  'category')
        }

        if(!req.body.trade.method) {
            Http_response.HTTP_400(req, res,  'method')
        }

        OffersService
            .createNewOffer(req, res, db)
            .then((offer) => res.status(200).send(offer))
            .catch((err) => err);
    },
    updateOfferById: (req, res,  db) => {
        OffersService
            .updateOfferById(req, res, db)
            .then((offer) => res.status(200).send(offer))
            .catch((err) => err);
    },
    deleteOfferById: (req, res,  db) => {
        OffersService
            .deleteOfferById(req, res, db)
            .then((offer) => res.status(200).send(offer))
            .catch((err) => err);
    },
    getOneOfferById: (req, res,  db) => {
        OffersService
            .getOneOfferById(req, res, db)
            .then((offer) => res.status(200).send(offer))
            .catch((err) => err);
    }
}
