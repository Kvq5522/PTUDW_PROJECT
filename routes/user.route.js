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

router.post('/profile', (req, res) => {
    controller.updateProfile(req, res);
});


module.exports = router;