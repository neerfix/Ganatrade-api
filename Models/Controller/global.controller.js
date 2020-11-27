const express = require("express");
const router = express.Router();
const pjson = require('../../package.json');
const db = require('../../utils/firebase');

// routes
router.get("/", getInfos);

module.exports = router;

function getInfos(req, res, next) {
    (async () => {
        try {
            const document = db.collection('info').doc('phFgIOlGtN9HEzl7PfH9');
            let data = await document.get();
            let response = data.data();
            if(response === undefined){
                return res.status(200).send(
                    {
                        "project": pjson.name,
                        "author": pjson.author,
                        "version": pjson.version,
                        "description": pjson.description,
                        "response": {
                            "status": "false"
                        }
                    }
                );
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
            return res.status(500).send(
                {
                "code": error.code,
                "message": error.message
            });
        }
    })();
}
