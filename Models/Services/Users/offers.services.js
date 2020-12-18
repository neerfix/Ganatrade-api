const db = require('../../../utils/firebase');

module.exports = {
    getAllOffersByUser,
};

async function getAllOffersByUser(req, res) {
    const offers = db.collection('offers');
    let response = [];
    await offers.where("user_id", "==", req.params.userId).get()
        .then(querySnapshot => {
        let followings = querySnapshot.docs;
        for (let following of followings) {
            response.push(following.data());
        }
    });

    if(!response > 0){
        return res.status(404).json({ "code": 404, "message": "Offers not found with this user Id", "reason": "" });
    }

    return res.status(200).json(response);
}