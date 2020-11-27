const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../utils/firebase');

module.exports = {
    getAllFollowings,
    getOneFollowingById,
    createNewFollowing,
    updateFollowingById,
    deleteFollowingById
};

async function getAllFollowings() {
    try {
        const document = db.collection('categories');
        let response = [];
        await document.get().then(querySnapshot => {
            let followings = querySnapshot.docs;
            for (let following of followings) {
                response.push(following.data());
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