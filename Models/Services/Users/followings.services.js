const db = require('../../../utils/firebase');

module.exports = {
    getAllFollowings,
    getOneFollowingById,
    createNewFollowing,
    updateFollowingById,
    deleteFollowingById
};

async function getAllFollowings(req) {
    try {
        const document = db.collection('users').doc(req.params.userId).collection('followings');
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

async function createNewFollowing(req) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
}

async function updateFollowingById(req) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
}

async function deleteFollowingById(req) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
}

async function getOneFollowingById(req) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
}