const carts = require('../models/Cart.model');
const products = require('../models/Product.model');
const users = require('../models/User.model');
const orders = require('../models/Order.model');

const getProfilePage = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    res.render('profile', {profile: req.user, message: req.user.verified ? 'Status: Verified!' : 'Status: Not verified!'});
};

const updateProfile = (req, res) => {
    const newPassword = req.body.newPassword ? req.body.newPassword : req.user.password;
    const newAddress = req.body.address ? req.body.address : req.user.address;
    const new_phone_number = req.body.phone_number ? req.body.phone_number : req.user.phone_number;
    const newDataUrl = req.body.dataUrl ? req.body.dataUrl : req.user.image_url;

    req.user.setPassword(newPassword, async (err, user) => {
        if (err) {
            console.log(err);
            res.render('profile', {profile: req.user, message: 'Result: Update failed!'});
            return;
        }
        
        req.user.address = newAddress;
        req.user.phone_number = new_phone_number;
        req.user.image_url = newDataUrl;
        await req.user.save();
        
        res.redirect('/user/profile');
    });
};

const getCartPage = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    if (!req.user.cart) {
        req.user.cart = new carts.Cart({});
    }

    let fetchedProducts = await products.Product.find({'_id': {$in: req.user.cart.items}});

    res.render('cart', {cartDetail: fetchedProducts.length > 0 ? fetchedProducts : [], total: req.user.cart.total});
}

const addProductToCart = async (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
        res.redirect('/auth/signin');
        return;
    }

    const productID = req.params.productID;
    const productPrice = Number(req.query.price);
    const productAvailable = req.query.available;

    console.log(productAvailable)

    if (!productAvailable) {
        res.send({message: 'Failed'})
        return;
    }

    if (!req.user.cart) {
        req.user.cart = new carts.Cart({});
    }

    if (!req.user.cart.items.includes(productID)) {
        req.user.cart.items.push(productID);
        req.user.cart.total += productPrice;
    }

    await req.user.save();
    res.send({message: 'Success'})
};

const deleteProductFromCart = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    const productID = req.params.productID;

    if (!req.user.cart) {
        res.redirect('/user/cart');
    }

    if (req.user.cart.items.includes(productID)) {
        req.user.cart.items = req.user.cart.items.filter(item => item !== productID);
        req.user.cart.total -= Number(req.query.price);
    }

    await req.user.save();
    res.redirect('/user/cart');
};

const getOrderInputPage = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    if (req.user.cart.items.length === 0) {
        res.redirect('/user/cart');
        return;
    }

    let fetchedProducts = await products.Product.find({'_id': {$in: req.user.cart.items}});
    
    res.render('order', {cartDetail: fetchedProducts.length > 0 ? fetchedProducts : []});
};

const submitOrder = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    const address = req.body.address ? req.body.address : req.user.address;
    const date = req.body.shippingDate;

    const newOrder = new orders.Order({
        username: req.user.username,
        userID: req.user._id,
        phone_number: req.user.phone_number,
        address: address,
        items: req.user.cart.items,
        total: req.user.cart.total,
        shippingDate: date
    });

    newOrder.save();
    req.user.cart = new carts.Cart({});
    await req.user.save();
    res.redirect('/user/cart');
};

module.exports = {
    getProfilePage,
    updateProfile,
    addProductToCart,
    getCartPage,
    deleteProductFromCart,
    getOrderInputPage,
    submitOrder
};