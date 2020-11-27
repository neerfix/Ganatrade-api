const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../utils/firebase');

module.exports = {
    getAllCategories,
    getOneCategoryById,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById
};

async function getAllCategories() {
        try {
            const data = db.collection('categories');
            let response = [];
            await data.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    response.push(doc.data());
                }
            });
            return response;
        } catch (error) {
            return {
                    "code": error.code,
                    "message": error.message
                };
        }
}

async function createNewCategory() {
    return "201";
}

async function updateCategoryById() {
    return "201";
}

async function deleteCategoryById() {
    return "201";
}

async function getOneCategoryById() {
    return "201";
}