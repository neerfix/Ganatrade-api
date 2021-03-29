const pjson = require('../../../package.json');

module.exports = {
    getInfos: (req, res,  db) => {
        return res.status(200).send(
            {
                "project": pjson.name,
                "author": pjson.author,
                "version": pjson.version,
                "description": pjson.description,
            }
        );
    }
}
