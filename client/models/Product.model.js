const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
    ,
    description: {
        type: String,
    },
    image_url: {
        type: String,
        required: true
    },
    review: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product,
    productSchema
}