const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require("./routes/routes");
const app = express();

admin.initializeApp();

app.enable('trust proxy')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = admin.firestore();

routes.crud(app, db);

exports.api = (req, res) => {
    console.log('I am a log entry!');
    console.error('I am an error!');
    res.end();
}
exports.api = functions.https.onRequest(app);
