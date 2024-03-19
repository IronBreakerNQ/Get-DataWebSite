const exprees = require('express');
const router = exprees.Router();

const getController = require('./controller/getController');


//get

router.get('/getSe',getController.GetSellOD);
router.get('/getBuy',getController.getBuyOD);


module.exports = router;