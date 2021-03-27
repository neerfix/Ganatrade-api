const express = require("express");
const router = express.Router();
const CategoryService = require("../Services/categories.services");

// routes -> /categories/

router.get("/", getAllCategories);
function getAllCategories(req, res, next) {
    CategoryService
        .getAllCategories(req, res)
        .then((categories) => res.status(200).send(categories))
        .catch((err) => next(err));
}

router.post("/", createNewCategory);
function createNewCategory(req, res, next) {

    if(!req.body.title){
        return res.status(400).json({ "code": 400, "message": "Bad request", "reason": "title is required" });
    }

    CategoryService
        .createNewCategory(req, res)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

router.patch("/:categoryId", updateCategoryById);
function updateCategoryById(req, res, next) {
    CategoryService
        .updateCategoryById(req, res)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

router.delete("/:categoryId", deleteCategoryById);
function deleteCategoryById(req, res, next) {
    CategoryService
        .deleteCategoryById(req, res)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

router.get("/:categoryId", getOneCategoryById);
function getOneCategoryById(req, res, next) {
    CategoryService
        .getOneCategoryById(req, res)
        .then((category) => res.status(200).send(category))
        .catch((err) => next(err));
}

module.exports = router;
