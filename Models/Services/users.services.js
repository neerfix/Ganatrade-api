const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../utils/firebase');
const admin = require('firebase-admin');

module.exports = {
    getAllUsers,
    getOneUserById,
    createNewUser,
    updateUserById,
    deleteUserById
};

//TODO
async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAllUsers(req, res) {
    const data = db.collection('users');
    let response = [];
    await data.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
            response.push(doc.data());
        }
    });
    return res.status(200).send(response);
}

async function getOneUserById(req, res) {
    const document = db.collection('users').doc(req.params.userId);
    let response = (await document.get()).data();

    if(!response){
        return res.status(404).send({code: 404, message: "User not found"});
    }

    return res.status(200).send(response);
}

async function createNewUser(req, res) {
    if(!req.body.email){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "email is required" });
    }

    if(!req.body.firstname){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "firstname is required" });
    }

    if(!req.body.lastname){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "lastname is required" });
    }

    if(!req.body.password){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "password is required" });
    }

    if(!req.body.password){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "password is required" });
    }

    if(!req.body.birthdate){
        return res.status(400).send({ "code": 400, "message": "Bad request", "reason": "birthdate is required" });
    }

    await admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        displayName: req.body.firstname + " " + req.body.lastname,
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
                    birthdate: new Date(req.body.birthdate),
                    phone: req.body.phoneNumber ? req.body.phoneNumber : "",
                    avatar: req.body.avatar ? req.body.avatar : "",
                    rank: req.body.rank ? req.body.rank : "trader",
                    private_profile: false,
                }).then(result =>{
                return result;
            }).catch(e => {
                return {code: e.code, message: e.message};
            });
        })
        .catch(function(error) {
            console.error('Error creating new user : ', error.message);
            return res.status(409).send({code: error.code, message: error.message, detail: 'Error creating new user : ' + error.message});
    })
}

async function updateUserById(req, res) {
    const document = db.collection('users').doc(req.params.userId);
    let response = (await document.get()).data();

    if(!response){
        return res.status(404).send({code: 404, message: "User not found"});
    }

    return res.status(200).send(response);
}

async function deleteUserById(req, res) {
    const document = db.collection('users').doc(req.params.userId);
    let response = (await document.get()).data();

    if(!response){
        return res.status(404).send({code: 404, message: "User not found"});
    }

    return res.status(200).send(response);
}
