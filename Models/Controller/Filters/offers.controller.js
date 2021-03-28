const express = require("express");
const router = express.Router();
const FollowingService = require("../../Services/Filters/offers.services");

// routes
router.get("/users/:userId/offers", getAllOffersByUser);
router.get("/offers/categories/:categoryId", getAllOffersByCategory);

module.exports = router;

function getAllOffersByUser(req, res, next) {
    FollowingService
        .getAllOffersByUser(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}

function getAllOffersByCategory(req, res, next) {
    FollowingService
        .getAllOffersByCategory(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}