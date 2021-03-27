const express = require("express");
const router = express.Router();
const searchService = require("../../Services/Filters/search.services");

// routes -> /search

router.get("/", search);
function search(req, res, next) {
    searchService
        .search(req, res)
        .then((users) => res.status(200).send(users))
        .catch((err) => next(err));
}

module.exports = router;
