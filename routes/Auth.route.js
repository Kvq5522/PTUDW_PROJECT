const exrpess = require('express');
const router = exrpess.Router();
const controller = require('../controllers/auth.controller');

router.get('/signin', (req, res) => {
    controller.getSigninPage(req, res);
});

router.post('/signin', (req, res, next) => {
    controller.validSignIn(req, res, next);
});

router.get('/signup', (req, res) => {
    controller.getSignupPage(req, res);
});

router.post('/signup', (req, res) => {
    controller.validSignUp(req, res);
});

router.get('/signout', (req, res) => {
    controller.signOut(req, res);
});

module.exports = router;

