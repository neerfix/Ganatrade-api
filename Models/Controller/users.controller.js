const express = require("express");
const router = express.Router();
const userService = require("../Services/users.services");

// routes
router.post("/authenticate", authenticate);
router.get("/", getAll);
router.get("/Pancake", getOneUserById);

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

function getAll(req, res, next) {
    userService
        .getAll()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function getOneUserById(req, res, next) {
    userService
        .getOneUserById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}
