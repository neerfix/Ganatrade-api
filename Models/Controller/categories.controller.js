const express = require("express");
const router = express.Router();
const userService = require("../Services/categories.services");

// routes
router.get("/", getAllCategory);
router.post("/", createNewCategory);
router.get("/:categoryId", getOneCategoryById);
router.patch("/:categoryId", updateCategoryById);
router.delete("/:categoryId", deleteCategoryById);

module.exports = router;

function getAllCategory(req, res, next) {
    CategoryService
        .getAll()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function createNewCategory(req, res, next) {
    CategoryService
        .getOneCategoryById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function updateCategoryById(req, res, next) {
    CategoryService
        .getOneCategoryById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function deleteCategoryById(req, res, next) {
    CategoryService
        .getOneCategoryById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function getOneCategoryById(req, res, next) {
    CategoryService
        .getOneCategoryById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}
