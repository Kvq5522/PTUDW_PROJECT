const getHomePage = (req, res) => {
    res.render('index');
};

const getAboutPage = (req, res) => {
    res.render('about');
}

module.exports = {
    getHomePage,
    getAboutPage
};