const db = require('../../utils/firebase');
const Http_response = require("../../utils/http-response");

module.exports = {
    search
};

async function search(req, res) {
    const regex = /[a-zA-Z]+./gm;
    const str = req.query.q
    let m;
    let q = [];

    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match) => {
            q.push(match);
        });
    }

    const data = db.collection('offers');
    let response = [];
    await data.get().then(querySnapshot => {
        let offers = querySnapshot.docs;

        for (let offer of offers) {
            for (let key of q){
                if(offer.data().title.includes(key)){
                    response.push(offer.data());
                }else if(offer.data().description.includes(key)){
                    response.push(offer.data());
                }
            }
        }
    });

    if(response.length <= 0){
        Http_response.HTTP_404(req, res, '', 'Offers')
    }

    return res.status(200).json(response);
}
