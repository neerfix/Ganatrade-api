const express = require("express");
const router = express.Router();
const FollowingService = require("../../Services/Users/offers.services");

// routes
router.get("/:userId/offers", getAllOffersByUser);

module.exports = router;

function getAllOffersByUser(req, res, next) {
    FollowingService
        .getAllOffersByUser(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}
