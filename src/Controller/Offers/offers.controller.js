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
