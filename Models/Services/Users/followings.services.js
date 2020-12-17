const db = require('../../../utils/firebase');

module.exports = {
    getAllFollowings,
    getOneFollowingById,
    createNewFollowing,
    updateFollowingById,
    deleteFollowingById
};

async function getAllFollowings(req, res) {
    const document = db.collection('users').doc(req.params.userId).collection('followings');
    let response = [];
    await document.get().then(querySnapshot => {
        let followings = querySnapshot.docs;
        for (let following of followings) {
            response.push(following.data());
        }
    });
    return res.status(200).send(response);
}

async function createNewFollowing(req, res) {
    if(!req.body.user_id){
        return res.status(400).json({ "code": 400, "message": "Bad request", "reason": "user_id is required" });
    }
    if(!req.body.offer_id && !req.body.category_id){
        return res.status(400).json({ "code": 400, "message": "Bad request", "reason": "category_id or offer_id is required" });
    }

    await db.collection('users').doc(req.params.userId).collection('followings').add({
        user_id: req.body.user_id,
        offer_id: req.body.offer_id ? req.body.offer_id : "",
        category_id: req.body.category_id ? req.body.category_id : "",
    }).then(async result => {
        await db.collection('users').doc(req.params.userId).collection('followings').doc(result.id).update({
            id: result.id
        });
        const document = db.collection('users').doc(req.params.userId).collection('followings').doc(result.id);
        let response = (await document.get()).data();

        if(!response){
            return res.status(404).send({code: 404, message: "Following not found"});
        }

        return res.status(201).json(response);
    }).catch(e => {
        return res.status(409).json({ e });
    });
}

async function updateFollowingById(req, res) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    let response = (await document.get()).data();

    if(!response){
        return res.status(404).send({code: 404, message: "Following not found"});
    }

    return res.status(200).send(response);
}

async function deleteFollowingById(req, res) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    if(!document) {
        return res.status(404).json({ "code": 404, "message": "Trade not found", "reason": "The following with this id or with this userId is not found" });
    }
    await document.delete()
        .then(result => {
            return res.status(200).send('The following was deleted with success !');
        })
        .catch(error => {
            return res.status(500).json({ "code": 500, "message": "Internal server error", "reason": "An unknown error was occurred", "details": error.message});
        })
}

async function getOneFollowingById(req, res) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    let response = (await document.get()).data();

    if(!response){
        return res.status(404).send({code: 404, message: "Following not found"});
    }

    return res.status(200).send(response);
}