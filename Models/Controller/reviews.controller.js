const express = require("express");
const router = express.Router();
const reviewService = require("../Services/reviews.services");

// routes
router.get("/", getAllReviews);
router.post("/", createNewReview);
router.get("/:reviewId", getOneReviewById);
router.patch("/:reviewId", updateReviewById);
router.delete("/:reviewId", deleteReviewById);

module.exports = router;

function getAllReviews(req, res, next) {
    reviewService
        .getAllReviews()
        .then((trades) => res.json(trades))
        .catch((err) => next(err));
}

function createNewReview(req, res, next) {
    reviewService
        .getOneReviewById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function updateReviewById(req, res, next) {
    reviewService
        .getOneReviewById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function deleteReviewById(req, res, next) {
    reviewService
        .getOneReviewById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function getOneReviewById(req, res, next) {
    reviewService
        .getOneReviewById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}
