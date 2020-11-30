const express = require("express");
const router = express.Router();
const OffersService = require("../Services/offers.services");

// routes
router.get("/", getAllCategories);
router.post("/", createNewOffer);
router.get("/:offerId", getOneOfferById);
router.patch("/:offerId", updateOfferById);
router.delete("/:offerId", deleteOfferById);

module.exports = router;

function getAllCategories(req, res, next) {
    OffersService
        .getAllOffers(req)
        .then((offers) => res.status(200).send(offers))
        .catch((err) => next(err));
}

function createNewOffer(req, res, next) {
    OffersService
        .createNewOffer(req)
        .then((offer) => res.status(200).send(offer))
        .catch((err) => next(err));
}

function updateOfferById(req, res, next) {
    OffersService
        .updateOfferById(req)
        .then((offer) => res.status(200).send(offer))
        .catch((err) => next(err));
}

function deleteOfferById(req, res, next) {
    OffersService
        .deleteOfferById(req)
        .then((offer) => res.status(200).send(offer))
        .catch((err) => next(err));
}

function getOneOfferById(req, res, next) {
    OffersService
        .getOneOfferById(req)
        .then((offer) => res.status(200).send(offer))
        .catch((err) => next(err));
}
