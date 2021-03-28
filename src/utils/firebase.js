const admin = require('firebase-admin');
let serviceAccount;

serviceAccount = require('../../config/serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});

module.exports = admin.firestore();
