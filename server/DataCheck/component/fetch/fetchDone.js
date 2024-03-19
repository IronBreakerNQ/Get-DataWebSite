const fetchDataPromise = require('./promiseFetch');

fetchDataPromise.then(({ Sello, Buyo }) => {
    console.log("Sello:", Sello);
    console.log("Buyo:", Buyo);
});