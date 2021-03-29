const OffersService = require("../../Services/Offers/offers.services");
const Http_response = require("../../utils/http-response");

// routes -> /offers/
module.exports = {
    getAllOffers: (req, res, next) => {
        OffersService
            .getAllOffers(req, res)
            .then((offers) => res.status(200).send(offers))
            .catch((err) => next(err));
    },
    createNewOffer: (req, res, next) => {
        if(!req.body.user_id) {
            Http_response.HTTP_400(req, res, next, 'user_id')
        }

        if(!req.body.title) {
            Http_response.HTTP_400(req, res, next, 'title')
        }

        if(!req.body.product.name) {
            Http_response.HTTP_400(req, res, next, 'name')
        }

        if(!req.body.product.condition) {
            Http_response.HTTP_400(req, res, next, 'condition')
        }

        if(!req.body.category) {
            Http_response.HTTP_400(req, res, next, 'category')
        }

        if(!req.body.trade.method) {
            Http_response.HTTP_400(req, res, next, 'method')
        }

        //TODO Create model in Models folder and pass params in call models
        OffersService
            .createNewOffer(req, res)
            .then((offer) => res.status(200).send(offer))
            .catch((err) => next(err));
    },
    updateOfferById: (req, res, next) => {
        OffersService
            .updateOfferById(req, res)
            .then((offer) => res.status(200).send(offer))
            .catch((err) => next(err));
    },
    deleteOfferById: (req, res, next) => {
        OffersService
            .deleteOfferById(req, res)
            .then((offer) => res.status(200).send(offer))
            .catch((err) => next(err));
    },
    getOneOfferById: (req, res, next) => {
        OffersService
            .getOneOfferById(req, res)
            .then((offer) => res.status(200).send(offer))
            .catch((err) => next(err));
    }
}
