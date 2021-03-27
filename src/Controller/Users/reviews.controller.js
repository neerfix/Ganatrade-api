const express = require("express");
const router = express.Router();
const reviewService = require("../../Services/Users/reviews.services");

// routes -> /users/

router.get("/:userId/reviews", getAllReviews);
function getAllReviews(req, res, next) {
    reviewService
        .getAllReviews(req, res)
        .then((reviews) => res.status(200).send(reviews))
        .catch((err) => next(err));
}

router.post("/:userId/reviews", createNewReview);
function createNewReview(req, res, next) {
    reviewService
        .createNewReview(req, res)
        .then((review) => res.status(200).send(review))
        .catch((err) => next(err));
}

router.patch("/:userId/reviews/:reviewId", updateReviewById);
function updateReviewById(req, res, next) {
    reviewService
        .updateReviewById(req, res)
        .then((review) => res.status(200).send(review))
        .catch((err) => next(err));
}

router.delete("/:userId/reviews/:reviewId", deleteReviewById);
function deleteReviewById(req, res, next) {
    reviewService
        .deleteReviewById(req, res)
        .then((review) => res.status(200).send(review))
        .catch((err) => next(err));
}

router.get("/:userId/reviews/:reviewId", getOneReviewById);
function getOneReviewById(req, res, next) {
    reviewService
        .getOneReviewById(req, res)
        .then((review) => res.status(200).send(review))
        .catch((err) => next(err));
}

module.exports = router;
