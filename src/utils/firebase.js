const admin = require('firebase-admin');
let serviceAccount;

serviceAccount = require('../../config/serviceAccount.json');

admin.initializeApp(serviceAccount);

module.exports = admin.firestore();
