const db = require('../../utils/firebase');
const admin = require('firebase-admin');

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
        return {
            "code": error.code,
            "message": error.message
        };
    }
}

async function getOneUserById(req, res) {
    const document = db.collection('users').doc(req.params.userId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "User not found"}
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
            }).catch(error => {
                return res.status(409).json({code: error.code, message: error.message});
            });
        })
        .catch(function(error) {
            return res.status(409).json({code: error.code, message: error.message});
    })
}

async function updateUserById(res, req) {
    const user =  db.collection('users').doc(req.params.userId)

    if(!user){
        return {code: 404, message: "User not found"}
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
        return res.status(202).send(result)
    }).catch(e => {
        return res.status(409).json({code: e.code, message: e.message, detail: "User not found"});
    });
}

async function deleteUserById(req,res) {
    const document = db.collection('users').doc(req.params.userId);
    let response = (await document.get()).data();

    if(!response){
        return res.status(404).json({message: "User not found"});
    }

    return response;
}
