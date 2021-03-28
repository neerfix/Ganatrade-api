const db = require('../utils/firebase');
const Http_response = require("../utils/http-response");

module.exports = {
    getAllCategories,
    getOneCategoryById,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById
};

async function getAllCategories(req, res) {

    let response = [];

    await db.collection('categories')
        .get()
        .then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                response.push(doc.data());
            }
        });

    return res.status(200).send(response);
}

async function createNewCategory(req, res) {

    await db.collection('categories').add({
        title: req.body.title,
        category_parent: req.body.category_parent ? req.body.category_parent : "",
        description: req.body.description ? req.body.description : "",
        img: req.body.img ? req.body.img : "",
        is_active: true,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now())
    }).then(result =>{

        db.collection('categories').doc(result.id).update({
            id: result.id
        });

        return res.status(202).send(' Successfully created a new category : ' + result.id + " => " + req.body.title);

    }).catch(e => {
        return res.status(409).json({ e });
    });
}

async function updateCategoryById(req, res) {
    const document = db.collection('categories').doc(req.params.categoryId);
    let data = (await document.get()).data();

    if(!data){
        Http_response.HTTP_404(req, res, '', 'Category')
    }

    let response = {
        title: req.body.title ? req.body.title : data.title,
        category_parent: req.body.category_parent ? req.body.category_parent : data.category_parent,
        description: req.body.description ? req.body.description : data.description,
        img: req.body.img ? req.body.img : data.img,
        is_active: req.body.is_active ? req.body.is_active : data.is_active,
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

async function deleteCategoryById(req, res) {
    const document = db.collection('categories').doc(req.params.categoryId);

    if(!document) {
        Http_response.HTTP_404(req, res, '', 'Category')
    }

    await document.delete()
        .then(result => {
            return res.status(200).send('The category was deleted with success !');
        })
        .catch(error => {
            return res.status(500).json({ "code": 500, "message": "Internal server error", "reason": "An unknown error was occurred", "details": error.message});
        })
}

async function getOneCategoryById(req, res) {
    const document = db.collection('categories').doc(req.params.categoryId);
    let response = (await document.get()).data();

    if(!response){
        Http_response.HTTP_404(req, res, '', 'Category')
    }

    return res.status(200).send(response);
}
