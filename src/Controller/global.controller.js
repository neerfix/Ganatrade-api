const express = require("express");
const router = express.Router();
const pjson = require('../../package.json');

router.get("/", getInfos);
function getInfos(req, res, next) {

    return res.status(200).send(
        {
            "project": pjson.name,
            "author": pjson.author,
            "version": pjson.version,
            "description": pjson.description,
        }
    );
}
module.exports = router;
