
const users = require('../models/User.model');
const passport = require('passport');

const getSigninPage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('signin', {message: ''});
        return;
    } 

    res.redirect('/user/profile');
};

const validSignIn = (req, res, next) => {
    const user = new users.User({
        username: req.body.username,
        password: req.body.password
    });

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.render('signin', {message: 'Result: ' + err.message});
            return;
        }

        if (!user) {
            res.render('signin', {message: 'Result: ' + info.message});
            return;
        }

        req.login(user, (err) => {
            if (err) {
                res.render('signin', {message: 'Result: ' + err.message});
                return;
            }

            res.redirect('/user/profile');
        });
    })(req, res, next);
};

const getSignupPage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('signup', {message: ''});
        return;
    } 

    res.redirect('/user/profile')
};

const validSignUp = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const address = req.body.address;

    users.User.register({username: email, phone_number: phone, address: address}, password, (err, user) => {
        if (err) {
            console.log(err);   
            res.render('signup', {message: 'Result: ' + err.message});
            return;
        }

        res.render('signup', {message: 'Result: Sign up successfully!'});
    })
};

const signOut = (req, res) => {
    req.logout((err) => {
        if (err) {
            res.render('signin', {message: 'Result: ' + err.message});
            return;
        }

        res.redirect('/auth/signin');
    });
};

module.exports = { 
    getSigninPage,
    validSignIn,
    getSignupPage,
    validSignUp,
    signOut
};