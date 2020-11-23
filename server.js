const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const router = express.Router();
const pjson = require('./package.json');
require('custom-env').env()

api.use(router);
api.use(bodyParser.urlencoded({
    extended: false
}));

api.use(bodyParser.json());
api.use(cors());

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
})