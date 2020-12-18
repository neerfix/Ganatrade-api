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

    if(!req.body.user_id) {
        return res.status(404).json({ "code": 400, "message": "user_id required", "reason": "The user_id is required" });
    }

    if(!req.body.title) {
        return res.status(404).json({ "code": 400, "message": "title required", "reason": "The title is required" });
    }

    if(!req.body.product.name) {
        return res.status(404).json({ "code": 400, "message": "name required", "reason": "The name is required" });
    }

    if(!req.body.product.condition) {
        return res.status(404).json({ "code": 400, "message": "condition required", "reason": "The condition is required" });
    }

    if(!req.body.product.category) {
        return res.status(404).json({ "code": 400, "message": "category required", "reason": "The category is required" });
    }

    if(!req.body.trade.method) {
        return res.status(404).json({ "code": 400, "message": "method required", "reason": "The method is required" });
    }

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
        tags: req.body.tags ? req.body.tags : "",
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
    }).then(async result =>{
        await db.collection('offers').doc(result.id).update({
            id: result.id
        })
        const document = db.collection('offers').doc(result.id);
        let response = (await document.get()).data();

        if(!response){
            return res.status(404).send({code: 404, message: "User not found"});
        }

        return res.status(201).send(response);
    }).catch(e => {
        console.error(e);
        return res.status(409).json(e);
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
        return res.status(404).send({code: 404, message: "Offer not found"});
    }

    await db.collection('offers').doc(req.params.offerId).update({
        views: response.views += 1
    })

    return res.status(200).send(response);
}