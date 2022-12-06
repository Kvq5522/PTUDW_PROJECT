const products = require('../models/Product.model');
const qs = require('qs');

const getProductPage = (req, res) => {
    const {sort, color, priceRange, ...withoutFilter} = req.query;

    let nameFilter = withoutFilter.name ? withoutFilter.name : '';
    nameFilter = nameFilter.charAt(0).toUpperCase() + nameFilter.slice(1);
    let colorFilter = color ? color : '';
    let sortFilter = sort ? sort : 'name';
    let lowPivot = priceRange ? Number(priceRange.split('-')[0]) : 0;
    let highPivot = priceRange ? Number(priceRange.split('-')[1]) : 1e9;
    

    products.Product.find({name: {'$regex': nameFilter, '$options': 'i'}, color: {'$regex': colorFilter}, 
    price: {$gte: lowPivot, $lte: highPivot}}).sort(`${sortFilter}`).exec((err, data) => {
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