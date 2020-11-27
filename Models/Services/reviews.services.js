const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../utils/firebase');

// users hardcoded for simplicity, store in a db for production applications
const reviews = [{ id: 1, username: 'pingouin', password: 'singe', firstName: 'oiseau', lastName: 'cachalot' }];

module.exports = {
    getAllReviews,
    getOneReviewById,
    createNewReview,
    updateReviewById,
    deleteReviewById
};

async function getAllReviews() {
    return reviews.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function createNewReview() {
    return "201";
}

async function updateReviewById() {
    return "201";
}

async function deleteReviewById() {
    return "201";
}

async function getOneReviewById() {
    return "201";
}
