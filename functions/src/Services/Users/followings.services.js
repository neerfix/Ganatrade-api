const db = require('../../utils/firebase');
const Http_response = require("../../utils/http-response");

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
    await db.collection('users').doc(req.params.userId).collection('followings').add({
        user_id: req.body.user_id,
        offer_id: req.body.offer_id ? req.body.offer_id : "",
        category_id: req.body.category_id ? req.body.category_id : "",
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now())
    }).then(async result => {
        await db.collection('users').doc(req.params.userId).collection('followings').doc(result.id).update({
            id: result.id
        });

        const document = db.collection('users').doc(req.params.userId).collection('followings').doc(result.id);
        let response = (await document.get()).data();

        if(!response){
            Http_response.HTTP_404(req, res, '', 'Following')
        }

        return res.status(201).json(response);
    }).catch(e => {
        return res.status(409).json({ e });
    });
}

async function updateFollowingById(req, res) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    let data = (await document.get()).data();

    if(!data){
        Http_response.HTTP_404(req, res, '', 'Following')
    }

    let response = {
        user_id: req.body.user_id ? req.body.user_id : data.user_id,
        offer_id: req.body.offer_id ? req.body.offer_id : req.body.offer_id,
        category_id: req.body.category_id ? req.body.category_id : req.body.category_id,
        created_at: data.created_at,
        updated_at: new Date(Date.now())
    }

    await document.update(response)
        .then(result => {
            return res.status(200).send(response);
        })
        .catch(error => {
            Http_response.HTTP_500(req, res, '', error)
        })
}

async function deleteFollowingById(req, res) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);

    if(!document) {
        Http_response.HTTP_404(req, res, '', 'Following')
    }

    await document.delete()
        .then(result => {
            return res.status(200).send('The following was deleted with success !');
        })
        .catch(error => {
            Http_response.HTTP_500(req, res, '', error)
        })
}

async function getOneFollowingById(req, res) {
    const document = db.collection('users').doc(req.params.userId).collection('followings').doc(req.params.followingId);
    let response = (await document.get()).data();

    if(!response){
        Http_response.HTTP_404(req, res, '', 'Following')
    }

    return res.status(200).send(response);
}
