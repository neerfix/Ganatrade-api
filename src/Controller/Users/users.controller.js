const express = require("express");
const router = express.Router();
const userService = require("../../Services/Users/users.services");
const Http_response = require('../../utils/http-response');

// routes -> /users/

router.get("/", getAllUsers);
function getAllUsers(req, res, next) {
    userService
        .getAllUsers(req, res)
        .then((users) => res.send(users))
        .catch((err) => next(err));
}

router.post("/", createNewUser);
function createNewUser(req, res, next) {
    if(!req.body.email){
        Http_response.HTTP_400(req, res, next, 'email')
    }

    if(!req.body.firstname){
        Http_response.HTTP_400(req, res, next, 'firstname')
    }

    if(!req.body.lastname){
        Http_response.HTTP_400(req, res, next, 'lastname')
    }

    if(!req.body.password){
        Http_response.HTTP_400(req, res, next, 'password')
    }

    userService
        .createNewUser(req, res)
        .then((users) => res.status(200).send(users))
        .catch((err) => next(err));
}

router.patch("/:userId", updateUserById);
function updateUserById(req, res, next) {
    userService
        .updateUserById(req, res)
        .then((user) => res.send(user))
        .catch((err) => next(err));
}

router.delete("/:userId", deleteUserById);
function deleteUserById(req, res, next) {
    userService
        .deleteUserById(req, res)
        .then((user) => res.send(user))
        .catch((err) => next(err));
}

router.get("/:userId", getOneUserById);
function getOneUserById(req, res, next) {
    userService
        .getOneUserById(req, res)
        .then((user) => res.send(user))
        .catch((err) => next(err));
}

module.exports = router;
