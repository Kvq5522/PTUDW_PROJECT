const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const carts = require('./Cart.model');

const userSchema = new mongoose.Schema({
    username: {
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
    image_url: {
        type: String,
        default: "data:image/png;base64,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"
    },
    recovery_string: {
        type: String,
        default: ""
    },
    cart: carts.cartSchema,
    registration: {
        type: Date,
        default: Date.now()
    },
    verified: {
        type: Boolean,
        default: false
    },
    ban: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    userSchema
};