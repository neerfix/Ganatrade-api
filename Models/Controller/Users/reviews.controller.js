const express = require("express");
const router = express.Router();
const reviewService = require("../../Services/Users/reviews.services");

// routes
router.get("/:userId/reviews", getAllReviews);
router.post("/:userId/reviews", createNewReview);
router.get("/:userId/reviews/:reviewId", getOneReviewById);
router.patch("/:userId/reviews/:reviewId", updateReviewById);
router.delete("/:userId/reviews/:reviewId", deleteReviewById);

module.exports = router;

function getAllReviews(req, res, next) {
    reviewService
        .getAllReviews(req, res)
        .then((reviews) => res.status(200).send(reviews))
        .catch((err) => next(err));
}

function createNewReview(req, res, next) {
    reviewService
        .createNewReview(req, res)
        .then((review) => res.status(200).send(review))
        .catch((err) => next(err));
}

function updateReviewById(req, res, next) {
    reviewService
        .updateReviewById(req, res)
        .then((review) => res.status(200).send(review))
        .catch((err) => next(err));
}

function deleteReviewById(req, res, next) {
    reviewService
        .deleteReviewById(req, res)
        .then((review) => res.status(200).send(review))
        .catch((err) => next(err));
}

function getOneReviewById(req, res, next) {
    reviewService
        .getOneReviewById(req, res)
        .then((review) => res.status(200).send(review))
        .catch((err) => next(err));
}
