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

async function createNewCategory(req) {
    const document = db.collection('categories').doc(req.params.categoryId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
}

async function updateCategoryById(req) {
    const document = db.collection('categories').doc(req.params.categoryId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "Following not found"}
    }

    return response;
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