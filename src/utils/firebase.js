const admin = require('firebase-admin');
let serviceAccount;

if(process.env.NODE_ENV !== 'production'){
    serviceAccount = require('../config/serviceAccount.json');
}

admin.initializeApp(serviceAccount);

module.exports = admin.firestore();
