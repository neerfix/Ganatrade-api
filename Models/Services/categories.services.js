const db = require('../../utils/firebase');

module.exports = {
    getAllCategories,
    getOneCategoryById,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById
};

async function getAllCategories() {
    let response = [];
    await db.collection('categories')
    .get()
        .then(querySnapshot => {
        let docs = querySnapshot.docs;
            for (let doc of docs) {
                response.push(doc.data());
            }
        });
    return response;
}

async function createNewCategory(req, res) {
    if(!req.body.title){
        return res.status(400).json({ "code": 400, "message": "Bad request", "reason": "title is required" });
    }

    await db.collection('categories').add({
        title: req.body.title,
        category_parent: req.body.category_parent ? req.body.category_parent : "",
        description: req.body.description ? req.body.description : "",
        img: req.body.img ? req.body.img : "",
        is_active: true,
        date: {
            created_at: new Date(Date.now()),
            updated_at: new Date(Date.now())
        }
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
    if(!req.body.title){
        return res.status(400).json({ "code": 400, "message": "Bad request", "reason": "title is required" });
    }

    await db.collection('categories').doc(req.params.categoryId).update({
        title: req.body.title,
        category_parent: req.body.category_parent ? req.body.category_parent : "",
        description: req.body.description ? req.body.description : "",
        is_active: req.body.is_active ? req.body.is_active : true,
        date: {
            updated_at: new Date(Date.now())
        }
    }).then(result =>{
        return res.status(202).send(' Successfully updated '+ req.body.title+' category');
    }).catch(e => {
        return res.status(409).json({ e });
    });
}

async function deleteCategoryById(req, res) {
    const document = db.collection('categories').doc(req.params.categoryId);
    if(!document) {
        return res.status(404).json({ "code": 404, "message": "Category not found", "reason": "The category with this id is not found" });
    }
    await document.delete()
        .then(result => {
            return res.status(200).send('The category was deleted with success !');
        })
        .catch(error => {
            return res.status(500).json({ "code": 500, "message": "Internal server error", "reason": "An unknown error was occurred", "details": error.message});
        })
}

async function getOneCategoryById(req) {
    const document = db.collection('categories').doc(req.params.categoryId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
}