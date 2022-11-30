const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');

router.get('/', (req, res) => {
    controller.getProductPage(req, res);
});

router.get('/:productID', (req, res) => {
    controller.getProductDetailPage(req, res);
});

module.exports = router;
