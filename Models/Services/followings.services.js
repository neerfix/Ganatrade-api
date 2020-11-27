const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const followings = [{ id: 1, name: 'Bateau', offers: 'Pancake' }];

module.exports = {
    getAllFollowings,
    getOneFollowingById,
    createNewFollowing,
    updateFollowingById,
    deleteFollowingById
};

async function getAllFollowings() {
    return followings.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function createNewFollowing() {
    return "201";
}

async function updateFollowingById() {
    return "201";
}

async function deleteFollowingById() {
    return "201";
}

async function getOneFollowingById() {
    return "201";
}