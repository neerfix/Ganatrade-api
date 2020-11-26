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
        .getAllCategories()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function createNewCategory(req, res, next) {
    CategoryService
        .createNewCategory()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function updateCategoryById(req, res, next) {
    CategoryService
        .updateCategoryById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function deleteCategoryById(req, res, next) {
    CategoryService
        .deleteCategoryById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}

function getOneCategoryById(req, res, next) {
    CategoryService
        .getOneCategoryById()
        .then(() => res.json("Ok"))
        .catch((err) => next(err));
}
