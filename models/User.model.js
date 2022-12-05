const mongoose = require('mongoose');
const carts = require('./Cart.model');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true  
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    phone_number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    recovery_string: {
        type: String,
        default: "recovery_string"
    },
    cart: carts.cartSchema
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userSchema
};