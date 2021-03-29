const userService = require("../../Services/Users/users.services");
const Http_response = require('../../utils/http-response');

// routes -> /users/
module.exports = {

    getAllUsers: (req, res,  db) => {
        userService
            .getAllUsers(req, res, db)
            .then((users) => res.send(users))
            .catch((err) => err);
    },
    createNewUser: (req, res,  db) => {
        if(!req.body.email){
            Http_response.HTTP_400(req, res,  'email')
        }

        if(!req.body.firstname){
            Http_response.HTTP_400(req, res,  'firstname')
        }

        if(!req.body.lastname){
            Http_response.HTTP_400(req, res,  'lastname')
        }

        if(!req.body.password){
            Http_response.HTTP_400(req, res,  'password')
        }

        userService
            .createNewUser(req, res, db)
            .then((users) => res.status(200).send(users))
            .catch((err) => err);
    },
    updateUserById: (req, res,  db) => {
        userService
            .updateUserById(req, res, db)
            .then((user) => res.send(user))
            .catch((err) => err);
    },
    deleteUserById: (req, res,  db) => {
        userService
            .deleteUserById(req, res, db)
            .then((user) => res.send(user))
            .catch((err) => err);
    },
    getOneUserById: (req, res,  db) => {
        userService
            .getOneUserById(req, res, db)
            .then((user) => res.send(user))
            .catch((err) => err);
    }
}
