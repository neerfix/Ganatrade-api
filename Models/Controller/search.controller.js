const express = require("express");
const router = express.Router();
const searchService = require("../Services/search.services");

// routes
router.get("/", search);

module.exports = router;

function search(req, res, next) {
    searchService
        .search(req, res)
        .then((users) => res.status(200).send(users))
        .catch((err) => next(err));
}