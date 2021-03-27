const express = require("express");
const router = express.Router();
const userService = require("../../Services/Users/users.services");

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
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "email is required" });
    }

    if(!req.body.firstname){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "firstname is required" });
    }

    if(!req.body.lastname){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "lastname is required" });
    }

    if(!req.body.password){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "password is required" });
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
