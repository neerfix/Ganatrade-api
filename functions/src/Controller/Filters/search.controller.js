const searchService = require("../../Services/Filters/search.services");

// routes -> /search
module.exports = {
    search: (req, res, db) =>
    {
        searchService
            .search(req, res, db)
            .then((users) => res.status(200).send(users))
            .catch((err) => err);
    }
}
