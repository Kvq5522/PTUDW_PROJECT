const products = require('../models/product.model');

const getProductPage = (req, res) => {
    products.Product.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.render('product', { productList: data });
    });
};

const getProductDetailPage = (req, res) => {
    const id = req.params.productID;

    products.Product.findById(id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        products.Product.find({ color: data.color }).where('_id').ne(id).exec((err, listData) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');  
                return;
            }

            res.render('product_detail', { item: data, relatedList: listData });
        });
    });
};

const addProductToCart = (req, res) => {

};

module.exports = {
    getProductPage,
    getProductDetailPage,
    addProductToCart
};