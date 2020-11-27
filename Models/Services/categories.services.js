const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const categories = [{ id: 1, name: 'Bateau', offers: 'Pancake' }];

module.exports = {
    getAllCategories,
    getOneCategoryById,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById
};

async function getAllCategories() {
    return categories.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
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