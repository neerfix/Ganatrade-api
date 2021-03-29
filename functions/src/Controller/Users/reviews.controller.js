const express = require("express");
const router = express.Router();
const reviewService = require("../../Services/Users/reviews.services");
const Http_response = require("../../utils/http-response");

// routes -> /users/
module.exports = {
    getAllReviews: (req, res, next) => {
        reviewService
            .getAllReviews(req, res)
            .then((reviews) => res.status(200).send(reviews))
            .catch((err) => next(err));
    },
    createNewReview: (req, res, next) => {
        if (!req.body.content) {
            Http_response.HTTP_400(req, res, next, 'content')
        }

        if (!req.body.author_id) {
            Http_response.HTTP_400(req, res, next, 'author_id')
        }

        if (!req.body.user_profile_id) {
            Http_response.HTTP_400(req, res, next, 'user_profile_id')
        }

        if (!req.body.note) {
            Http_response.HTTP_400(req, res, next, 'note')
        }

        reviewService
            .createNewReview(req, res)
            .then((review) => res.status(200).send(review))
            .catch((err) => next(err));
    },
    updateReviewById: (req, res, next) => {
        reviewService
            .updateReviewById(req, res)
            .then((review) => res.status(200).send(review))
            .catch((err) => next(err));
    },
    deleteReviewById: (req, res, next) => {
        reviewService
            .deleteReviewById(req, res)
            .then((review) => res.status(200).send(review))
            .catch((err) => next(err));
    },
    getOneReviewById: (req, res, next) => {
        reviewService
            .getOneReviewById(req, res)
            .then((review) => res.status(200).send(review))
            .catch((err) => next(err));
    }
}
