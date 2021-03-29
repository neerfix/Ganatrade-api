const Http_response = require("../../utils/http-response");

module.exports = {
    getAllOffers,
    getOneOfferById,
    createNewOffer,
    updateOfferById,
    deleteOfferById
};

async function getAllOffers(req, res, db) {
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

async function createNewOffer(req, res, db) {
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
            Http_response.HTTP_404(req, res, '', 'Offers')
        }

        return res.status(201).send(response);
    }).catch(e => {
        console.error(e);
        return res.status(409).json(e);
    });
}

async function updateOfferById(req, res, db) {
    const document = db.collection('offers').doc(req.params.offerId);
    let data = (await document.get()).data();

    if(!data){
        Http_response.HTTP_404(req, res, '', 'Offers')
    }

    let response = {
        user_id: req.body.user_id ? req.body.user_id : data.user_id,
        title: req.body.title ? req.body.title : data.title,
        product: {
            name: req.body.product.name ? req.body.product.name : data.product.name,
            condition: req.body.product.condition ? req.body.product.condition : data.product.name
        },
        description: req.body.description ? req.body.description : data.description,
        pictures: req.body.pictures ? req.body.pictures : data.pictures,
        category: req.body.category ? req.body.category : data.category,
        tags: req.body.tags ? req.body.tags : data.tags,
        trade: {
            method: req.body.trade.method ? req.body.trade.method : data.trade.method,
            target: req.body.trade.target ? req.body.trade.target : data.trade.target,
            estimation: req.body.trade.estimation ? req.body.trade.estimation : data.trade.estimation,
            place: req.body.trade.place ? req.body.trade.place : data.trade.place,
            radius: req.body.trade.radius ? req.body.trade.radius : data.trade.radius,
        },
        views: data.views,
        saves: data.saves,
        is_active: req.body.is_active ? req.body.is_active : data.is_active,
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

async function deleteOfferById(req, res, db) {
    const document = db.collection('offers').doc(req.params.offerId);
    if(!document) {
        Http_response.HTTP_404(req, res, '', 'Offers')
    }
    await document.delete()
        .then(result => {
            return res.status(200).send('The offer was deleted with success !');
        })
        .catch(error => {
            Http_response.HTTP_500(req, res, '', error)
        })
}

async function getOneOfferById(req, res, db) {
    const document = db.collection('offers').doc(req.params.offerId);
    let response = (await document.get()).data();

    if(!response){
        Http_response.HTTP_404(req, res, '', 'Offers')
    }

    await db.collection('offers').doc(req.params.offerId).update({
        views: response.views += 1
    })

    return res.status(200).send(response);
}
