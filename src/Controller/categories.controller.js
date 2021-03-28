const express = require("express");
const router = express.Router();
const CategoryService = require("../Services/categories.services");
const Http_response = require("../utils/http-response");

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
        Http_response.HTTP_400(req, res, next, 'title')
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
