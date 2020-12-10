const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../utils/firebase');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    authenticate,
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

async function getAllUsers() {
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

async function getOneUserById(req) {
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
                    avatar: req.body.avatar,
                    rank: "trader",
                    private_profile: false,
                }).then(result =>{
                return result;
            }).catch(e => {
                return  e;
            });
        })
        .catch(function(error) {
        console.log('Error creating new user : ', error.message);
      return error
    })
}

async function updateUserById() {
    const document = db.collection('users').doc(req.params.userId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "User not found"}
    }

    return response;
}

async function deleteUserById(req) {
    const document = db.collection('users').doc(req.params.userId);
    let response = (await document.get()).data();

    if(!response){
        return {code: 404, message: "User not found"}
    }

    return response;
}
