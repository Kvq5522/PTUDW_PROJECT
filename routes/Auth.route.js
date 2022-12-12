const exrpess = require('express');
const router = exrpess.Router();
const controller = require('../controllers/Auth.controller');

router.get('/signin', (req, res) => {
    controller.getSigninPage(req, res);
});

router.post('/signin', (req, res) => {
    controller.validSignIn(req, res);
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

