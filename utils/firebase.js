const admin = require('firebase-admin');
let serviceAccount;

if(process.env.NODE_ENV !== 'production'){
    serviceAccount = require('../config/serviceAccount-beta.json');
}else{
    serviceAccount = require('../config/serviceAccount.json');
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});

module.exports = admin.firestore();