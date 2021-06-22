const mongo = require('mongoose');
const schema = mongo.Schema;

var Orderschema = mongo.Schema({
    user: {
        // it refers to the type of the column of object
        type: schema.Types.ObjectId,
        // I determine the object that the type refers to
        ref: 'User',
        required: true
    },
    cart: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    orderprice: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },

    // To delete the order after a period

});

module.exports = mongo.model('Order', Orderschema);