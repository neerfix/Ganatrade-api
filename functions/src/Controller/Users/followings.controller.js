const express = require("express");
const router = express.Router();
const FollowingService = require("../../Services/Users/followings.services");
const Http_response = require("../../utils/http-response");

// routes -> /users

router.get("/:userId/followings/", getAllFollowings);
function getAllFollowings(req, res, next) {
    FollowingService
        .getAllFollowings(req, res)
        .then((followings) => res.status(200).send(followings))
        .catch((err) => next(err));
}

router.post("/:userId/followings/", createNewFollowing);
function createNewFollowing(req, res, next) {
    if(!req.body.user_id){
        Http_response.HTTP_400(req, res, next, 'user_id')
    }

    if(!req.body.offer_id && !req.body.category_id){
        Http_response.HTTP_400(req, res, next, 'offer_id')
    }

    FollowingService
        .createNewFollowing(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}

router.patch("/:userId/followings/:followingId", updateFollowingById);
function updateFollowingById(req, res, next) {
    FollowingService
        .updateFollowingById(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}

router.delete("/:userId/followings/:followingId", deleteFollowingById);
function deleteFollowingById(req, res, next) {
    FollowingService
        .deleteFollowingById(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}

router.get("/:userId/followings/:followingId", getOneFollowingById);
function getOneFollowingById(req, res, next) {
    FollowingService
        .getOneFollowingById(req, res)
        .then((following) => res.status(200).send(following))
        .catch((err) => next(err));
}

module.exports = router;
