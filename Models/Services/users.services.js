const db = require('../../utils/firebase');
const admin = require('firebase-admin');
const responses = require('responses/messages')

module.exports = {
    getAllUsers,
    getOneUserById,
    createNewUser,
    updateUserById,
    deleteUserById
};

async function getAllUsers(req, res) {
    try {
        const data = db.collection('users');
        let response = [];
        await data.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                response.push(doc.data());
            }
        });
        return response;
    } catch (error) {
        return responses.errors(res, 400, error, "")
    }
}

async function getOneUserById(req, res) {
    const document = db.collection('users').doc(req.params.userId);
    let response = (await document.get()).data();

    if(!response){
        return responses.errors(res, 404, {code: "Not Found"}, "User Not Found")
    }

    return response;
}

async function createNewUser(req, res) {
    admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        displayName: req.body.firstName + " " + req.body.lastName,
        photoURL: req.body.avatar,
        disabled: false,
    })
        .then(function(userRecord) {
            db.collection('users').doc(userRecord.uid)
                .set({
                    id: userRecord.uid,
                    delete_profile: false,
                    created_at: new Date(userRecord.metadata.creationTime),
                    last_login: new Date(userRecord.metadata.creationTime),
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    phone: req.body.phoneNumber ? req.body.phoneNumber : "",
                    avatar: req.body.avatar ? req.body.avatar : "https://tse3.mm.bing.net/th?id=OIP.hpdsrTb2AqrQj8PWZbQzkwHaHa&o=6&pid=Api",
                    rank: req.body.rank,
                    private_profile: false,
                }).then(result =>{
                return result;
            }).catch(e => {
                return responses.errors(res, 400, e, "")
            });
        })
        .catch(function(error) {
            return responses.errors(res, 404, error, "User Not Found")
    })
}

async function updateUserById(res, req) {
    const user =  db.collection('users').doc(req.params.userId)

    if(!user){
        return responses.errors(res, 404, null, "User Not Found")
    }

    await user.update({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        phone: req.body.phoneNumber ? req.body.phoneNumber : "",
        avatar: req.body.avatar ? req.body.avatar : "https://tse3.mm.bing.net/th?id=OIP.hpdsrTb2AqrQj8PWZbQzkwHaHa&o=6&pid=Api",
        rank: req.body.rank,
        private_profile: false,
    }).then(result =>{
        return responses.successUpdate(res, result)
    }).catch(e => {
        return responses.errors(res, 409, e, "Email already taken")
    });
}

async function deleteUserById(req,res) {
    const document = db.collection('users').doc(req.params.userId);
    let response = (await document.get()).data();

    if(!response){
        return responses.errors(res, 404, {code:"Not Found"}, "User Not Found")
    }

    return response;
}
