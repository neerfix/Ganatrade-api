const FollowingService = require("../../Services/Filters/offers.services");

module.exports = {
    getAllOffersByUser: (req, res, next) => {
        FollowingService
            .getAllOffersByUser(req, res)
            .then((following) => res.status(200).send(following))
            .catch((err) => next(err));
    },
    getAllOffersByCategory: (req, res, next) => {
        FollowingService
            .getAllOffersByCategory(req, res)
            .then((following) => res.status(200).send(following))
            .catch((err) => next(err));
    }
}
