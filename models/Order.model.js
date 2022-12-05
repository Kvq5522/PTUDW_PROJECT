const mongoose = require('mongoose');
const products = require('./Product.model');

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: [products.productSchema],
    total: {
        type: Number,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Order,
    orderSchema
}