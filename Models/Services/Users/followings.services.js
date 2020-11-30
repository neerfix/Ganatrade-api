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

async function createNewFollowing() {
    return "201";
}

async function updateFollowingById() {
    return "201";
}

async function deleteFollowingById() {
    return "201";
}

async function getOneFollowingById(req, res) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
}