const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/', (req, res) => {
    controller.getSigninPage(req, res);
});

router.get('/signin', (req, res) => {
    controller.getSigninPage(req, res);
});

router.get('/signup', (req, res) => {
    controller.getSignupPage(req, res);
});

module.exports = router;