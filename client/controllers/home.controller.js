const getHomePage = (req, res) => {4
    res.render('index');
};

const getAboutPage = (req, res) => {
    res.render('about');
}

module.exports = {
    getHomePage,
    getAboutPage
};