module.exports = {
    getInfos: (req, res,  db) => {
        return res.status(200).send(
            {
                status: true
            }
        );
    }
}
