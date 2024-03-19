const fetchDataPromise = require('../component/fetch/promiseFetch');
module.exports = {
    async GetSellOD(req,res) {
        try{
            const {Sello} = await fetchDataPromise;
            res.status(201).send(Sello);
        }catch(error){
            console.log(error)
            res.status(500).send(error);
        }
    },

    async getBuyOD(res) {
        try{
            const { Buyo } = await fetchDataPromise;
            res.status(201).send(Buyo);
        }catch(error){
            console.log(error)
            res.status(500).send(error);
        }
    }

}