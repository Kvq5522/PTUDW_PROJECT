
require('dotenv').config({
    path: './.env'
});
const users = require('../models/User.model');
const passport = require('passport');
const mailer = require('../config/mailer');
const bcrypt = require('bcrypt');

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

        if (user.ban) {
            res.render('signin', {message: 'Result: Your account has been banned!'});
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

const getRecoveryPage = (req, res) => {
    res.render('recovery', {message: ''});
}

const sendToken = (req, res) => {
    const email = req.body.username;

    if (!email) {
        console.log('Email is required!')
        res.send({message: 'Result: Email is required!'});
        res.end();
        return;
    }

    users.User.findOne({username: email}, (err, user) => {
        if (err) {
            res.send({message: 'Result: ' + err.message});
            res.end();
            return;
        }

        if (!user) {
            res.send({message: 'Result: Email does not exist!'});
            res.end();
            return;
        }

        bcrypt.hash(user.username, parseInt(process.env.SALT_ROUNDS), (err, hashed) => {
            if (err) {
                res.send({message: 'Result: ' + err.message});
                res.end();
                return;
            }

            const htmlContent = `
            <h2>Reset your password</h2>
            <p>Your token is: ${hashed}</p>
            `;

            mailer.sendMail(email, 'Reset your password', htmlContent);
            user.recovery_string = hashed;
            user.save();

            res.send({message: 'Result: Token has been sent to your email!'});
            res.end();
        });
    });
}

const resetPassword = (req, res) => {
    const username = req.body.username
    const token = req.body.token;
    const password = req.body.password;

    if (!username || !token || !password) {
        res.send({message: 'Result: Please fill in all fields'});
        res.end();
        return;
    }

    users.User.findOne({username: username}, (err, user) => {
        if (err) {
            res.send({message: 'Result: ' + err.message});
            res.end();
            return;
        }

        if (!token == user.recovery_string) {
            res.send({message: 'Result: Wrong token'});
            res.end();
            return;
        }

        user.setPassword(password, (err, user) => {
            if (err) {
                res.send({message: 'Result: ' + err.message});
                res.end();
                return;
            }

            user.recovery_string = '';
            user.save();

            res.send({message: 'Result: Password has been changed, please log in again'});
            res.end();
        });
    }); 
}

const sendActivationEmail = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    const id = req.user.id;
    const username = req.user.username;
    
    bcrypt.hash(id, parseInt(process.env.SALT_ROUNDS), (err, hashed) => {
        if (err) {
            res.send({message: 'Result: ' + err.message});
            res.end();
            return;
        }

        while (hashed.includes('/')) {
            hashed = hashed.replace('/', '*');
        }

        const htmlContent = `
        <h2>Activate your account</h2>
        <p>Url: ${req.protocol}://${req.hostname}:${process.env.PORT}/auth/activate/sent/${hashed}?id=${id}</p>
        `;
    
        mailer.sendMail(username, 'Activate your account', htmlContent);
        res.redirect('back');
    })
}

const activateAccount = (req, res) => {
    let token = req.params.token;
    let id = req.query.id;

    while (token.includes('*')) {
        token = token.replace('*', '/');
    }

    if (!bcrypt.compare(id, token)) {
        res.send({message: 'Result: Wrong token'});
        res.end();
        return;
    }

    users.User.findById(id, (err, user) => {
        if (err) {
            res.send({message: 'Result: ' + err.message});
            res.end();
            return;
        }

        user.verified = true;
        user.save();

        res.redirect('/user/profile');
    });
}

module.exports = { 
    getSigninPage,
    validSignIn,
    getSignupPage,
    validSignUp,
    signOut,
    getRecoveryPage,
    sendToken, 
    resetPassword,
    sendActivationEmail,
    activateAccount
};