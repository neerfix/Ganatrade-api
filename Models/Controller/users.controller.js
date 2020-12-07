const express = require("express");
const router = express.Router();
const userService = require("../Services/users.services");

// routes
router.post("/authenticate", authenticate);
router.get("/", getAllUsers);
router.post("/", createNewUser);
router.get("/:userId", getOneUserById);
router.patch("/:userId", updateUserById);
router.delete("/:userId", deleteUserById);

module.exports = router;

function authenticate(req, res, next) {
    userService
        .authenticate(req.body)
        .then((user) =>
            user
                ? res.json(user)
                : res.status(400).json({ message: "Username or password is incorrect" })
        )
        .catch((err) => next(err));
}

function getAllUsers(req, res, next) {
    userService
        .getAllUsers()
        .then((users) => res.status(200).send(users))
        .catch((err) => next(err));
}

function createNewUser(req, res, next) {
    userService
        .createNewUser(req, res)
        .then((result) => res.json(result+ ' Successfully created new user:'))
        .catch((err) => next(err));
}

function updateUserById(req, res, next) {
    userService
        .updateUserById(req)
        .then((user) => res.status(200).send(user))
        .catch((err) => next(err));
}

function deleteUserById(req, res, next) {
    userService
        .deleteUserById(req)
        .then((user) => res.status(200).send(user))
        .catch((err) => next(err));
}

function getOneUserById(req, res, next) {
    userService
        .getOneUserById(req)
        .then((user) => res.status(200).send(user))
        .catch((err) => next(err));
}
