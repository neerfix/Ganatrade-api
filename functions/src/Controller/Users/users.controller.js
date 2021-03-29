const userService = require("../../Services/Users/users.services");
const Http_response = require('../../utils/http-response');

// routes -> /users/
module.exports = {

    getAllUsers: (req, res, next) => {
        userService
            .getAllUsers(req, res)
            .then((users) => res.send(users))
            .catch((err) => next(err));
    },
    createNewUser: (req, res, next) => {
        if(!req.body.email){
            Http_response.HTTP_400(req, res, next, 'email')
        }

        if(!req.body.firstname){
            Http_response.HTTP_400(req, res, next, 'firstname')
        }

        if(!req.body.lastname){
            Http_response.HTTP_400(req, res, next, 'lastname')
        }

        if(!req.body.password){
            Http_response.HTTP_400(req, res, next, 'password')
        }

        userService
            .createNewUser(req, res)
            .then((users) => res.status(200).send(users))
            .catch((err) => next(err));
    },
    updateUserById: (req, res, next) => {
        userService
            .updateUserById(req, res)
            .then((user) => res.send(user))
            .catch((err) => next(err));
    },
    deleteUserById: (req, res, next) => {
        userService
            .deleteUserById(req, res)
            .then((user) => res.send(user))
            .catch((err) => next(err));
    },
    getOneUserById: (req, res, next) => {
        userService
            .getOneUserById(req, res)
            .then((user) => res.send(user))
            .catch((err) => next(err));
    }
}
