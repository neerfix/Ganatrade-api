const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('../../utils/firebase');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
    authenticate,
    getAllUsers,
    getOneUserById,
    createNewUser,
    updateUserById,
    deleteUserById
};

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
            let users = querySnapshot.docs;
            for (let user of users) {
                response.push(user.data());
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

async function getOneUserById() {
    return "201";
}

async function createNewUser() {
    return "201";
}

async function updateUserById() {
    return "201";
}

async function deleteUserById() {
    return "201";
}