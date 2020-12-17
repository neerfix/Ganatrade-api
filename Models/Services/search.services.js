const db = require('../../utils/firebase');

module.exports = {
    search
};

async function search(req, res) {
    const regex = /[a-zA-Z]+./gm;
    const str = req.query.q
    let m;
    let response = [];

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(match);
            response.push(match);
        });
    }

    return res.status(200).send(response);


    // const data = db.collection('offers');
    // let response = [];
    // await data.get().then(querySnapshot => {
    //     let offers = querySnapshot.docs;
    //     for (let offer of offers) {
    //         response.push(offer.data());
    //     }
    // });
}