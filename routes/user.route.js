const express = require('express');
const router = express.Router();
const controller = require('../controllers/User.controller');
const cartRouter = require('./Cart.route');

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    res.redirect('/user/profile');
});

router.get('/profile', (req, res) => {
    controller.getProfilePage(req, res);
});

router.post('/profile', (req, res) => {
    controller.updateProfile(req, res);
});

router.get('/cart', (req, res) => {
    controller.getCartPage(req, res);
});

router.get('/cart/add/:productID', (req, res) => {
    controller.addProductToCart(req, res);
});

router.get('/cart/delete/:productID', (req, res) => {
    controller.deleteProductFromCart(req, res);
});


module.exports = router;