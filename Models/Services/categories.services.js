const db = require('../../utils/firebase');

module.exports = {
    getAllCategories,
    getOneCategoryById,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById
};

async function getAllCategories() {
        try {
            const data = db.collection('categories');
            let response = [];
            data.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    response.push(doc.data());
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

async function createNewCategory(req, res) {
    await db.collection('categories').add({
        title: req.body.title,
        category_parent: req.body.category_parent ? req.body.category_parent : "",
        description: req.body.description ? req.body.description : "",
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
        return res.status(409).send({ e });
    });
}

async function updateCategoryById(req, res) {
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
        return res.status(409).send({ e });
    });
}

async function deleteCategoryById(req) {
    const document = db.collection('categories').doc(req.params.categoryId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
}

async function getOneCategoryById(req) {
    const document = db.collection('categories').doc(req.params.categoryId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
}