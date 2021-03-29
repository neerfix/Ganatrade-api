const Http_response = require("../../utils/http-response");

module.exports = {
    getAllReviews,
    getOneReviewById,
    createNewReview,
    updateReviewById,
    deleteReviewById
};

async function getAllReviews(req, res, db) {
    const data = db.collection('users').doc(req.params.userId).collection('reviews');
    let response = [];

    await data.get().then(querySnapshot => {
        let reviews = querySnapshot.docs;
        for (let review of reviews) {
            response.push(review.data());
        }
    });

    return res.status(200).send(response);
}

async function createNewReview(req, res, db) {
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
        return res.status(409).json({ e });
    });
}

async function updateReviewById(req, res, db) {
    const document = db.collection('users').doc(req.params.userId).collection("reviews").doc(req.params.reviewId);
    let data = (await document.get()).data();

    if(!data){
        Http_response.HTTP_404(req, res, '', 'Review')
    }

    let response = {
        content: req.body.trader_id ? req.body.trader_id : data.trader_id,
        author_id: req.body.author_id ? req.body.author_id : data.author_id,
        user_profile_id: req.body.user_profile_id ? req.body.user_profile_id : data.user_profile_id,
        note: req.body.note ? req.body.note : data.notes,
        is_visible: req.body.is_visible ? req.body.is_visible : data.is_visible,
        created_at: data.created_at,
        updated_at: new Date(Date.now())
    }

    await document.update(response)
        .then(result => {
            return res.status(200).send(response);
        })
        .catch(e => {
            return res.status(500).json({ "code": 500, "message": "Internal server error", "reason": "An unknown error was occurred", "details": error.message});
        })
}

async function deleteReviewById(req, res, db) {
    const document = db.collection('users').doc(req.params.userId).collection('reviews').doc(req.params.reviewId);

    if(!document) {
        Http_response.HTTP_404(req, res, '', 'Review')
    }

    await document.delete()
        .then(result => {
            return res.status(200).send('The trade was deleted with success !');
        })
        .catch(error => {
            return res.status(500).json({ "code": 500, "message": "Internal server error", "reason": "An unknown error was occurred", "details": error.message});
        })
}

async function getOneReviewById(req, res, db) {
    const document = db.collection('users').doc(req.params.userId).collection("reviews").doc(req.params.reviewId);
    let response = (await document.get()).data();

    if(!response){
        Http_response.HTTP_404(req, res, '', 'Review')
    }

    return res.status(200).send(response);
}
