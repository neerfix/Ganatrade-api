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

async function createNewReview(req) {
    const document = db.collection('users').doc(req.params.userId).collection("reviews").doc(req.params.reviewId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Review not found"}
    }

    return response;
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