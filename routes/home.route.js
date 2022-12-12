const express = require('express');
const router = express.Router();
const controller = require('../controllers/Home.controller');

router.get('/', (req, res) => {
    controller.getHomePage(req, res);
});

router.get('/about', (req, res) => {
    controller.getAboutPage(req, res);
});

module.exports = router;