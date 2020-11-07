const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const router = express.Router();

api.use(router);
api.use(bodyParser.urlencoded({
    extended: false
}));

api.use(bodyParser.json());
api.use(cors());

api.get("/", function (req, res) {
    res.send("Hello world, welcome to V1 api - Ganatrade.");
})

api.listen(8888, () => {
    console.log(`App listening at http://localhost:8888`)
})