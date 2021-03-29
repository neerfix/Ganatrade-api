const CategoryService = require("../Services/categories.services");
const Http_response = require("../utils/http-response");

// routes -> /categories/
module.exports = {
    getAllCategories: (req, res,  db) => {
        CategoryService
            .getAllCategories(req, res, db)
            .then((categories) => res.status(200).send(categories))
            .catch((err) => err);
    },
    createNewCategory: (req, res,  db) => {
        if(!req.body.title){
            Http_response.HTTP_400(req, res,  'title')
        }

        CategoryService
            .createNewCategory(req, res, db)
            .then((category) => res.status(200).send(category))
            .catch((err) => err);
    },
    updateCategoryById: (req, res,  db) => {
        CategoryService
            .updateCategoryById(req, res, db)
            .then((category) => res.status(200).send(category))
            .catch((err) => err);
    },
    deleteCategoryById: (req, res,  db) => {
        CategoryService
            .deleteCategoryById(req, res, db)
            .then((category) => res.status(200).send(category))
            .catch((err) => err);
    },
    getOneCategoryById: (req, res,  db) => {
        CategoryService
            .getOneCategoryById(req, res, db)
            .then((category) => res.status(200).send(category))
            .catch((err) => err);
    }
}
