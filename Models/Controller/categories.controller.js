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
        .getAllCategories(req)
        .then((categories) => res.status(200).send(categories))
        .catch((err) => next(err));
}

function createNewCategory(req, res, next) {
    CategoryService
        .createNewCategory(req)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

function updateCategoryById(req, res, next) {
    CategoryService
        .updateCategoryById(req)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

function deleteCategoryById(req, res, next) {
    CategoryService
        .deleteCategoryById(req)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

function getOneCategoryById(req, res, next) {
    CategoryService
        .getOneCategoryById(req)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}
