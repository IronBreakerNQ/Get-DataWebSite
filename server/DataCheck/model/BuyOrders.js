const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyordersSchema = new Schema({
    NameUsr:{
        type: String,
        require: true
    },
    orderNumber:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    },
    lastUpdate:{
        type: String,
        require: true
    },
    dateBill:{
        type : Date,
        require:true
    }
});

const BuyOrders = mongoose.model('ByOrders', buyordersSchema);

module.exports = BuyOrders;