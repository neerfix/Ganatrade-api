const express = require("express");
const router = express.Router();
const userService = require("../Services/users.services");

// routes
router.get("/", getAllUsers);
router.post("/", createNewUser);
router.get("/:userId", getOneUserById);
router.patch("/:userId", updateUserById);
router.delete("/:userId", deleteUserById);

module.exports = router;

function getAllUsers(req, res, next) {
    userService
        .getAllUsers(req, res)
        .then((users) => res.send(users))
        .catch((err) => next(err));
}

function createNewUser(req, res, next) {
    userService
        .createNewUser(req, res)
        .then((category) => res.status(200).send(category))
        // .then( (result) => {
            // console.log(result)
            // res.status(200).send(result)
        // })
        .catch(error => {
            res.status(500).send("FOCK" + error);
        })
        .finally( p => {
            res.status(400).send(p);
        })
}

function updateUserById(req, res, next) {
    userService
        .updateUserById(req, res)
        .then((user) => res.send(user))
        .catch((err) => next(err));
}

function deleteUserById(req, res, next) {
    userService
        .deleteUserById(req, res)
        .then((user) => res.send(user))
        .catch((err) => next(err));
}

function getOneUserById(req, res, next) {
    userService
        .getOneUserById(req, res)
        .then((user) => res.send(user))
        .catch((err) => next(err));
}
