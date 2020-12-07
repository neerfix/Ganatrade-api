const db = require('../../../utils/firebase');

module.exports = {
    getAllReviews,
    getOneReviewById,
    createNewReview,
    updateReviewById,
    deleteReviewById
};

async function getAllReviews(req) {
    try {
        const data = db.collection('users').doc(req.params.userId).collection('reviews');
        let response = [];
        await data.get().then(querySnapshot => {
            let reviews = querySnapshot.docs;
            for (let review of reviews) {
                response.push(review.data());
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

async function createNewReview(req, res) {
    if(!req.body.content){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "content is required" });
    }
    if(!req.body.author_id){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "author_id is required" });
    }
    if(!req.body.user_profile_id){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "user_profile_id is required" });
    }
    if(!req.body.note){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "note is required" });
    }

    await db.collection('users').doc(req.params.userId).collection('reviews').add({
        content: req.body.trader_id,
        author_id: req.body.author_id,
        user_profile_id: req.body.user_profile_id,
        note: req.body.note,
        is_visible: true,
        created_at: new Date(Date.now()),
        update_at: new Date(Date.now())
    }).then(result =>{
        db.collection('users').doc(req.params.userId).collection('reviews').doc(result.id).update({
            id: result.id
        });
        return res.status(202).send(' Successfully created a new review : ' + result.id);
    }).catch(e => {
        return res.status(409).send({ e });
    });
}

async function updateReviewById(req) {
    const document = db.collection('users').doc(req.params.userId).collection("reviews").doc(req.params.reviewId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Review not found"}
    }

    return response;
}

async function deleteReviewById(req) {
    const document = db.collection('users').doc(req.params.userId).collection("reviews").doc(req.params.reviewId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Review not found"}
    }

    return response;
}

async function getOneReviewById(req) {
    const document = db.collection('users').doc(req.params.userId).collection("reviews").doc(req.params.reviewId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Review not found"}
    }

    return response;
}