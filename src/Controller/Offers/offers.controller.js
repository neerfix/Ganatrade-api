const express = require("express");
const router = express.Router();
const OffersService = require("../../Services/Offers/offers.services");

// routes -> /offers/

router.get("/", getAllCategories);
function getAllCategories(req, res, next) {
    OffersService
        .getAllOffers(req, res)
        .then((offers) => res.status(200).send(offers))
        .catch((err) => next(err));
}

router.post("/", createNewOffer);
function createNewOffer(req, res, next) {
    if(!req.body.user_id) {
        return res.status(404).json({ "code": 400, "message": "user_id required", "reason": "The user_id is required" });
    }

    if(!req.body.title) {
        return res.status(404).json({ "code": 400, "message": "title required", "reason": "The title is required" });
    }

    if(!req.body.product.name) {
        return res.status(404).json({ "code": 400, "message": "name required", "reason": "The name is required" });
    }

    if(!req.body.product.condition) {
        return res.status(404).json({ "code": 400, "message": "condition required", "reason": "The condition is required" });
    }

    if(!req.body.category) {
        return res.status(404).json({ "code": 400, "message": "category required", "reason": "The category is required" });
    }

    if(!req.body.trade.method) {
        return res.status(404).json({ "code": 400, "message": "method required", "reason": "The method is required" });
    }

    //TODO Create model in Models folder and pass params in call models
    OffersService
        .createNewOffer(req, res)
        .then((offer) => res.status(200).send(offer))
        .catch((err) => next(err));
}

router.patch("/:offerId", updateOfferById);
function updateOfferById(req, res, next) {
    OffersService
        .updateOfferById(req, res)
        .then((offer) => res.status(200).send(offer))
        .catch((err) => next(err));
}

router.delete("/:offerId", deleteOfferById);
function deleteOfferById(req, res, next) {
    OffersService
        .deleteOfferById(req, res)
        .then((offer) => res.status(200).send(offer))
        .catch((err) => next(err));
}

router.get("/:offerId", getOneOfferById);
function getOneOfferById(req, res, next) {
    OffersService
        .getOneOfferById(req, res)
        .then((offer) => res.status(200).send(offer))
        .catch((err) => next(err));
}

module.exports = router;
