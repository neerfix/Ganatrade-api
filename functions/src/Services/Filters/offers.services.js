const Http_response = require("../../utils/http-response");

module.exports = {
    getAllOffersByUser,
    getAllOffersByCategory
};

async function getAllOffersByUser(req, res, db) {
    const offers = db.collection('offers');

    let response = [];

    await offers.where("user_id", "==", req.params.userId).get()
        .then(querySnapshot => {
            let documents = querySnapshot.docs;
            for (let offer of documents) {
                response.push(offer.data());
            }
        });

    if(!response > 0){
        Http_response.HTTP_404(req, res, '', 'Offers')
    }

    return res.status(200).json(response);
}

async function getAllOffersByCategory(req, res, db) {
    const offers = db.collection('offers');

    let response = [];

    await offers.where("category", "==", req.params.categoryId).get()
        .then(querySnapshot => {
            let documents = querySnapshot.docs;
            for (let offer of documents) {
                response.push(offer.data());
            }
        });

    if(!response > 0){
        Http_response.HTTP_404(req, res, '', 'Offers')
    }

    return res.status(200).json(response);
}
