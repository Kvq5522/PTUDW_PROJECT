const getHomePage = (req, res) => {
    res.render('index');
};

const getAboutPage = (req, res) => {
    res.send('about');
}

module.exports = {
    getHomePage,
    getAboutPage
};