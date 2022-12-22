const exrpess = require('express');
const router = exrpess.Router();
const controller = require('../controllers/Auth.controller');

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

router.get('/recovery', (req, res) => {
    controller.getRecoveryPage(req, res);
});

router.post('/recovery/token', (req, res) => {
    controller.sendToken(req, res);
});

router.post('/recovery/reset', (req, res) => {
    controller.resetPassword(req, res);
})

module.exports = router;

