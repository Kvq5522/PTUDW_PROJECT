const express = require('express');
const router = express.Router();
const controller = require('../controllers/User.controller');

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

router.post('/update_profile', (req, res) => {
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

router.get('/cart/order/input', (req, res) => {
    controller.getOrderInputPage(req, res);
});

router.post('/cart/order/submit', (req, res) => {
    controller.submitOrder(req, res);
});


module.exports = router;