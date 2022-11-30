const getProductPage = (req, res) => {
    res.render('product');
};

const getProductDetailPage = (req, res) => {
    res.render('product_detail');
};

module.exports = {
    getProductPage,
    getProductDetailPage
};