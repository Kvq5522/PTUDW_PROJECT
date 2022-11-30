const getSigninPage = (req, res) => {
    res.render('signin');
};

const getSignupPage = (req, res) => {
    res.render('signup');
};

module.exports = {
    getSigninPage,
    getSignupPage
};