const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    imagePath: {
        type: String,
        required: true
    },
    imagePathTwo: {
        type: String,
        required: true
    },
    producttName: {
        type: String,
        required: true
    },
    information: {
        type: {
            color: String,
            size: String,
            pieces: Number,
            oldPrice: Number,
        },
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});



module.exports = mongoose.model('Product', productSchema);