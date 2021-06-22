const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id: {
        require: true,
        type: String,
    },
    totalquantiy: {
        require: true,
        type: Number,
    },
    totalPrice: {
        require: true,
        type: Number,
    },
    localPrice: {
        require: true,
        type: Number,
    },
    image: {
        require: true,
        type: String,
    },
    selectedProduct: {
        require: true,
        type: Array,
    },
    createAt: {
        type: Date,
        index: { expires: '45m' }
    }
});



module.exports = mongoose.model('Cart', cartSchema);