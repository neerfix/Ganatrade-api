const CategoryService = require("../Services/categories.services");
const Http_response = require("../utils/http-response");

// routes -> /categories/
module.exports = {
    getAllCategories: (req, res, next) => {
        CategoryService
            .getAllCategories(req, res)
            .then((categories) => res.status(200).send(categories))
            .catch((err) => next(err));
    },
    createNewCategory: (req, res, next) => {
        if(!req.body.title){
            Http_response.HTTP_400(req, res, next, 'title')
        }

        CategoryService
            .createNewCategory(req, res)
            .then((category) => res.status(200).send(category))
            .catch((err) => next(err));
    },
    updateCategoryById: (req, res, next) => {
        CategoryService
            .updateCategoryById(req, res)
            .then((category) => res.status(200).send(category))
            .catch((err) => next(err));
    },
    deleteCategoryById: (req, res, next) => {
        CategoryService
            .deleteCategoryById(req, res)
            .then((category) => res.status(200).send(category))
            .catch((err) => next(err));
    },
    getOneCategoryById: (req, res, next) => {
        CategoryService
            .getOneCategoryById(req, res)
            .then((category) => res.status(200).send(category))
            .catch((err) => next(err));
    }
}
