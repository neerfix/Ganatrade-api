const FollowingService = require("../../Services/Filters/offers.services");

module.exports = {
    getAllOffersByUser: (req, res, db) => {
        FollowingService
            .getAllOffersByUser(req, res, db)
            .then((following) => res.status(200).send(following))
            .catch((err) => err);
    },
    getAllOffersByCategory: (req, res, db) => {
        FollowingService
            .getAllOffersByCategory(req, res, db)
            .then((following) => res.status(200).send(following))
            .catch((err) => err);
    }
}
