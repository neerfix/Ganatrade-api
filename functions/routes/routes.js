const categories = require("../src/Controller/categories.controller");
const offers = require("../src/Controller/Offers/offers.controller");
const trades = require("../src/Controller/Offers/trades.controller");
const users = require("../src/Controller/Users/users.controller");
const reviews = require("../src/Controller/Users/reviews.controller");
const followings = require("../src/Controller/Users/followings.controller");
const global = require("../src/Controller/global.controller");
const search = require("../src/Controller/Filters/search.controller");
const filters = require("../src/Controller/Filters/offers.controller");

module.exports = {
    crud: (app, db) => {

        app
            // Global
            .get("/", (req, res) => {
                global.getInfos(req, res)
            })

            // User
            .get("/users/", (req, res) => {
                users.getAllUsers(req, res, db)
            })
            .get("/users/:userId", (req, res) => {
                users.getOneUserById(req, res, db)
            })
            .post("/users/:userId", (req, res) => {
                users.createNewUser(req, res, db)
            })
            .patch("/users/:userId", (req, res) => {
                users.updateUserById(req, res, db)
            })
            .delete("/users/:userId", (req, res) => {
                users.deleteUserById(req, res, db)
            })

            // Followings
            .get("/users/:userId/followings", (req, res) => {
                followings.getAllFollowings(req, res, db)
            })
            .get("/users/:userId/followings/:followingId", (req, res) => {
                followings.getOneFollowingById(req, res, db)
            })
            .post("/users/:userId/followings", (req, res) => {
                followings.createNewFollowing(req, res, db)
            })
            .patch("/users/:userId/followings/:followingId", (req, res) => {
                followings.updateFollowingById(req, res, db)
            })
            .delete("/users/:userId/followings/:followingId", (req, res) => {
                followings.deleteFollowingById(req, res, db)
            })

            // Reviews
            .get("/users/:userId/reviews", (req, res) => {
                reviews.getAllReviews(req, res, db)
            })
            .get("/users/:userId/reviews/:reviewId", (req, res) => {
                reviews.getOneReviewById(req, res, db)
            })
            .post("/users/:userId/reviews", (req, res) => {
                reviews.createNewReview(req, res, db)
            })
            .patch("/users/:userId/reviews/:reviewId", (req, res) => {
                reviews.updateReviewById(req, res, db)
            })
            .delete("/users/:userId/reviews/:reviewId", (req, res) => {
                reviews.deleteReviewById(req, res, db)
            })

            // Offers
            .get("/offers/", (req, res) => {
                offers.getAllOffers(req, res, db)
            })
            .get("/offers/:offerId", (req, res) => {
                offers.getOneOfferById(req, res, db)
            })
            .post("/offers/:offerId", (req, res) => {
                offers.createNewOffer(req, res, db)
            })
            .patch("/offers/:offerId", (req, res) => {
                offers.updateOfferById(req, res, db)
            })
            .delete("/offers/:offerId", (req, res) => {
                offers.deleteOfferById(req, res, db)
            })

            // Trades
            .get("/offers/:offerId/trades/", (req, res) => {
                trades.getAllTrades(req, res, db)
            })
            .get("/offers/:offerId/trades/", (req, res) => {
                trades.getOneTradeById(req, res, db)
            })
            .post("/offers/:offerId/trades/:tradeId", (req, res) => {
                trades.createNewTrade(req, res, db)
            })
            .patch("/offers/:offerId/trades/:tradeId", (req, res) => {
                trades.updateTradeById(req, res, db)
            })
            .delete("/offers/:offerId/trades/:tradeId", (req, res) => {
                trades.deleteTradeById(req, res, db)
            })
            .post("/offers/:offerId/trades/:tradeId/accept", (req, res) => {
                trades.acceptTrade(req, res, db)
            })
            .post("/offers/:offerId/trades/:tradeId/refuse", (req, res) => {
                trades.refuseTrade(req, res, db)
            })

            // Categories
            .get("/categories/", (req, res) => {
                categories.getAllCategories(req, res, db)
            })
            .get("/categories/:categoryId", (req, res) => {
                categories.getOneCategoryById(req, res, db)
            })
            .post("/categories/:categoryId", (req, res) => {
                categories.createNewCategory(req, res, db)
            })
            .patch("/categories/:categoryId", (req, res) => {
                categories.updateCategoryById(req, res, db)
            })
            .delete("/categories/:categoryId", (req, res) => {
                categories.deleteCategoryById(req, res, db)
            })

            // Filters
            .get("/search/", (req, res) => {
                search.search(req, res, db)
            })
            .get("/users/:userId/offers", (req, res) => {
                filters.getAllOffersByUser(req, res, db)
            })
            .get("/offers/categories/:categoryId", (req, res) => {
                filters.getAllOffersByCategory(req, res, db)
            })
    }
};
