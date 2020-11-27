const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const trades = [{ id: 1, username: 'Antoine', password: 'jesuisunmotdepasse', firstName: 'oui', lastName: 'non' }];

module.exports = {
    getAllTrades,
    getOneTradeById,
    createNewTrade,
    updateTradeById,
    deleteTradeById
};

async function getAllTrades() {
    return trades.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function createNewTrade() {
    return "201";
}

async function updateTradeById() {
    return "201";
}

async function deleteTradeById() {
    return "201";
}

async function getOneTradeById() {
    return "201";
}
