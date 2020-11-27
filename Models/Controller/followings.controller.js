const express = require("express");
const router = express.Router();
const FollowingService = require("../Services/followings.services");

// routes
router.get("/", getAllFollowings);
router.post("/", createNewFollowing);
router.get("/:followingId", getOneFollowingById);
router.patch("/:followingId", updateFollowingById);
router.delete("/:followingId", deleteFollowingById);

module.exports = router;

function getAllFollowings(req, res, next) {
    FollowingService
        .getAllFollowings()
        .then((followings) => res.status(200).send(followings))
        .catch((err) => next(err));
}

function createNewFollowing(req, res, next) {
    FollowingService
        .createNewFollowing()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function updateFollowingById(req, res, next) {
    FollowingService
        .updateFollowingById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function deleteFollowingById(req, res, next) {
    FollowingService
        .deleteFollowingById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function getOneFollowingById(req, res, next) {
    FollowingService
        .getOneFollowingById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}
