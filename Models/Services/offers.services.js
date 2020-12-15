const db = require('../../utils/firebase');

module.exports = {
    getAllOffers,
    getOneOfferById,
    createNewOffer,
    updateOfferById,
    deleteOfferById
};

async function getAllOffers(req, res) {
    const data = db.collection('offers');
    let response = [];
    await data.get().then(querySnapshot => {
        let offers = querySnapshot.docs;
        for (let offer of offers) {
            response.push(offer.data());
        }
    });
    return res.status(200).send(response);
}

async function createNewOffer(req, res) {
    await db.collection('offers').add({
        user_id: req.body.user_id,
        title: req.body.title,
        product: {
          name: req.body.product.name,
          condition: req.body.product.condition
        },
        description: req.body.description ? req.body.description : "",
        pictures: req.body.pictures ? req.body.pictures : "",
        category: req.body.category,
        tags: req.body.tags,
        trade: {
          method: req.body.trade.method,
          target: req.body.trade.target ? req.body.trade.target : "",
          estimation: req.body.trade.estimation ? req.body.trade.estimation : "",
          place: req.body.trade.place ? req.body.trade.place : "",
          radius: req.body.trade.radius ? req.body.trade.radius : "",
        },
        views: 0,
        saves: 0,
        is_active: true,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now())
    }).then(result =>{
        db.collection('offers').doc(result.id).update({
            id: result.id
        });
        return res.status(202).send(' Successfully created a new offer : ' + result.id + " => " + req.body.title);
    }).catch(e => {
        return res.status(409).json({ e });
    });
}

async function updateOfferById(req, res) {
    const document = db.collection('offers').doc(req.params.offerId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Offer not found"}
    }

    return res.status(200).send(response);
}

async function deleteOfferById(req, res) {
        const document = db.collection('offers').doc(req.params.id);
        if(!document) {
            return res.status(404).json({ "code": 404, "message": "Offer not found", "reason": "The offer with this id is not found" });
        }
        await document.delete()
            .then(result => {
                return res.status(200).send('The offer was deleted with success !');
            })
            .catch(error => {
                return res.status(500).json({ "code": 500, "message": "Internal server error", "reason": "An unknown error was occurred", "details": error.message});
            })
}

async function getOneOfferById(req, res) {
    const document = db.collection('offers').doc(req.params.offerId);
    let response = (await document.get()).data();

    if(!response){
        return res.status(404).send({code: 404, message: "User not found"});
    }

    return res.status(200).send(response);
}