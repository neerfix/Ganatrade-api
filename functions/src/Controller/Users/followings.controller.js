const FollowingService = require("../../Services/Users/followings.services");
const Http_response = require("../../utils/http-response");

// routes -> /users
module.exports = {
    getAllFollowings:(req, res,  db) => {
        FollowingService
            .getAllFollowings(req, res, db)
            .then((followings) => res.status(200).send(followings))
            .catch((err) => err);
    },
    createNewFollowing: (req, res,  db) => {
        if(!req.body.user_id){
            Http_response.HTTP_400(req, res,  'user_id')
        }

        if(!req.body.offer_id && !req.body.category_id){
            Http_response.HTTP_400(req, res,  'offer_id')
        }

        FollowingService
            .createNewFollowing(req, res, db)
            .then((following) => res.status(200).send(following))
            .catch((err) => err);
    },
    updateFollowingById: (req, res,  db) => {
        FollowingService
            .updateFollowingById(req, res, db)
            .then((following) => res.status(200).send(following))
            .catch((err) => err);
    },
    deleteFollowingById: (req, res,  db) => {
        FollowingService
            .deleteFollowingById(req, res, db)
            .then((following) => res.status(200).send(following))
            .catch((err) => err);
    },
    getOneFollowingById: (req, res,  db) => {
        FollowingService
            .getOneFollowingById(req, res, db)
            .then((following) => res.status(200).send(following))
            .catch((err) => err);
    }
}
