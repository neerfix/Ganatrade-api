const admin = require('firebase-admin');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const router = express.Router();
const pjson = require('./package.json');
let serviceAccount;
require('custom-env').env(process.env.NODE_ENV)

if(process.env.NODE_ENV !== 'production'){
    serviceAccount = require('./config/serviceAccount-beta.json');
}else{
    serviceAccount = require('./config/serviceAccount.json');
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
    (async () => {
        try {
            const document = db.collection('info').doc('phFgIOlGtN9HEzl7PfH9');
            let data = await document.get();
            let response = data.data();
            if(response === undefined){
                return res.status(404).send(errorMessage('Resource was not found', 'The data at the specified id does not exist.'));
            }else{
                return res.status(200).send(
                    {
                        "project": pjson.name,
                        "author": pjson.author,
                        "version": pjson.version,
                        "description": pjson.description,
                        response
                    }
                );
            }
        } catch (error) {
            return res.status(500).send(errorMessage(error.code, error.message));
        }
    })();
})

api.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:`+process.env.PORT)
})