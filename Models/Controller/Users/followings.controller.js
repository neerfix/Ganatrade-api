const express = require("express");
const router = express.Router();
const FollowingService = require("../../Services/Users/followings.services");

// routes
router.get("/:userId/followings/", getAllFollowings);
router.post("/:userId/followings/", createNewFollowing);
router.get("/:userId/followings/:followingId", getOneFollowingById);
router.patch("/:userId/followings/:followingId", updateFollowingById);
router.delete("/:userId/followings/:followingId", deleteFollowingById);

module.exports = router;

function getAllFollowings(req, res, next) {
    FollowingService
        .getAllFollowings(req, res)
        .then((followings) => res.status(200).send(followings))
        .catch((err) => next(err));
}

function createNewFollowing(req, res, next) {
    FollowingService
        .createNewFollowing(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}

function updateFollowingById(req, res, next) {
    FollowingService
        .updateFollowingById(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}

function deleteFollowingById(req, res, next) {
    FollowingService
        .deleteFollowingById(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}

function getOneFollowingById(req, res, next) {
    FollowingService
        .getOneFollowingById(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}
