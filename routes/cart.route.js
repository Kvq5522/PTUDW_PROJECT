const express = require('express');
const router = express.Router();
const controller = require('../controllers/Cart.controller');

router.get('/', (req, res) => {
    controller.getCartPage(req, res);
});

module.exports = router;