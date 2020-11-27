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
        .getAllOffers()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function createNewOffer(req, res, next) {
    OffersService
        .createNewOffer()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function updateOfferById(req, res, next) {
    OffersService
        .updateOfferById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function deleteOfferById(req, res, next) {
    OffersService
        .deleteOfferById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function getOneOfferById(req, res, next) {
    OffersService
        .getOneOfferById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}
