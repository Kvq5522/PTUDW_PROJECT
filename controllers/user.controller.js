const carts = require('../models/Cart.model');
const products = require('../models/Product.model');
const orders = require('../models/Order.model');

const getProfilePage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    res.render('profile', {profile: req.user});
};

const updateProfile = (req, res) => {
    res.send('developing...');
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

const addProductToCart = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    const productID = req.params.productID;
    const productPrice = Number(req.query.price);

    if (!req.user.cart) {
        req.user.cart = new carts.Cart({});

    }

    if (!req.user.cart.items.includes(productID)) {
        req.user.cart.items.push(productID);
        req.user.cart.total += productPrice;
    }

    req.user.save();
    res.end();
};

const deleteProductFromCart = (req, res) => {
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

    req.user.save();
    res.redirect('/user/cart');
};

const getOrderInputPage = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    let fetchedProducts = await products.Product.find({'_id': {$in: req.user.cart.items}});

    res.render('order', {cartDetail: fetchedProducts.length > 0 ? fetchedProducts : []});
};

const submitOrder = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    const address = req.body.address ? req.body.address : req.user.address;
    const date = req.body.shippingDate;

    const newOrder = new orders.Order({
        username: req.user._id,
        phone_number: req.user.phone_number,
        address: address,
        items: req.user.cart.items,
        total: req.user.cart.total,
        shippingDate: date
    });

    newOrder.save();
    req.user.cart = new carts.Cart({});
    req.user.save();
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