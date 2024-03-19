const exprees = require('express');
const router = exprees.Router();
const dataRouter = require('./data');

router.use('/data',dataRouter);

module.exports = router;