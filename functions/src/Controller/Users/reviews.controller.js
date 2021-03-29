const express = require("express");
const router = express.Router();
const reviewService = require("../../Services/Users/reviews.services");
const Http_response = require("../../utils/http-response");

// routes -> /users/
module.exports = {
    getAllReviews: (req, res,  db) => {
        reviewService
            .getAllReviews(req, res, db)
            .then((reviews) => res.status(200).send(reviews))
            .catch((err) => err);
    },
    createNewReview: (req, res,  db) => {
        if (!req.body.content) {
            Http_response.HTTP_400(req, res,  'content')
        }

        if (!req.body.author_id) {
            Http_response.HTTP_400(req, res,  'author_id')
        }

        if (!req.body.user_profile_id) {
            Http_response.HTTP_400(req, res,  'user_profile_id')
        }

        if (!req.body.note) {
            Http_response.HTTP_400(req, res,  'note')
        }

        reviewService
            .createNewReview(req, res, db)
            .then((review) => res.status(200).send(review))
            .catch((err) => err);
    },
    updateReviewById: (req, res,  db) => {
        reviewService
            .updateReviewById(req, res, db)
            .then((review) => res.status(200).send(review))
            .catch((err) => err);
    },
    deleteReviewById: (req, res,  db) => {
        reviewService
            .deleteReviewById(req, res, db)
            .then((review) => res.status(200).send(review))
            .catch((err) => err);
    },
    getOneReviewById: (req, res,  db) => {
        reviewService
            .getOneReviewById(req, res, db)
            .then((review) => res.status(200).send(review))
            .catch((err) => err);
    }
}
