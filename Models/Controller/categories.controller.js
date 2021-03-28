const express = require("express");
const router = express.Router();
const CategoryService = require("../Services/categories.services");

// routes
router.get("/", getAllCategories);
router.post("/", createNewCategory);
router.get("/:categoryId", getOneCategoryById);
router.patch("/:categoryId", updateCategoryById);
router.delete("/:categoryId", deleteCategoryById);

module.exports = router;

function getAllCategories(req, res, next) {
    CategoryService
        .getAllCategories(req, res)
        .then((categories) => res.status(200).send(categories))
        .catch((err) => next(err));
}

function createNewCategory(req, res, next) {
    CategoryService
        .createNewCategory(req, res)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

function updateCategoryById(req, res, next) {
    CategoryService
        .updateCategoryById(req, res)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

function deleteCategoryById(req, res, next) {
    CategoryService
        .deleteCategoryById(req, res)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

function getOneCategoryById(req, res, next) {
    CategoryService
        .getOneCategoryById(req, res)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}
