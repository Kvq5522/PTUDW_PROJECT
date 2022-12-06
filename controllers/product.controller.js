const products = require('../models/Product.model');
const qs = require('qs');

const getProductPage = (req, res) => {
    const {sort, color, ...withoutFilter} = req.query;

    let name = withoutFilter.name ? withoutFilter.name : '';
    name = name.charAt(0).toUpperCase() + name.slice(1);

    // products.Product.find({name: {'$regex': name}}, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('Internal Server Error');
    //         return;
    //     }

    //     console.log(withoutFilter);

    //     res.render('product', { productList: data, originalUrl: `${req.baseUrl}?${qs.stringify(withoutFilter)}` });
    // });
    products.Product.find({name: {'$regex': name}}).sort({price: 1}).exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.render('product', { productList: data, originalUrl: `${req.baseUrl}?${qs.stringify(withoutFilter)}` });
    });
};

const getProductDetailPage = (req, res) => {
    const id = req.params.productID;

    console.log(req.query);

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

            res.render('product_detail', { item: data, relatedList: listData});
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