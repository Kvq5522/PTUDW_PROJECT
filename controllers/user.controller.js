const getProfilePage = (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/signin');
        return;
    }

    res.render('profile', {profile: req.user});
};

const updateProfile = (req, res) => {
    res.send('developing...');
};

module.exports = {
    getProfilePage,
    updateProfile
};