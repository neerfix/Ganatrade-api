const admin = require('firebase-admin');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const router = express.Router();
const pjson = require('./package.json');
const conf =require('custom-env').env()

const serviceAccount = {
    type: "service_account",
    project_id: "ganatrade-441f3",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: "firebase-adminsdk-8lrh2@ganatrade-441f3.iam.gserviceaccount.com",
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8lrh2%40ganatrade-441f3.iam.gserviceaccount.com"
}

api.use(router);
api.use(bodyParser.urlencoded({
    extended: false
}));

api.use(bodyParser.json());
api.use(cors());

const errorMessage = (reason, message, type, detail) => {
    return {
        "reason": reason,
        "message": message,
        "type": type,
        "detail": detail
    }
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

api.get("/", function (req, res) {
    res.send(
        {
            "project": pjson.name,
            "author": pjson.author,
            "version": pjson.version,
            "description": pjson.description
            }
        );
})

api.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:`+process.env.PORT)
    console.log(conf);
})