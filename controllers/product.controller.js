const products = require('../models/Product.model');
const qs = require('qs');
const { query } = require('express');

const getProductPage = async (req, res) => {
    const {sort, color, priceRange, sortValue, ...withoutFilter} = req.query;
    const maxItem = 9;

    const nameFilter = withoutFilter.name ?? ''; 
    const colorFilter = color ?? '';
    const sortFilter = sort ?? 'name';
    const lowPivot = priceRange ? Number(priceRange.split('-')[0]) : 0;
    const highPivot = priceRange ? Number(priceRange.split('-')[1]) : 1e9;
    const sortValueFilter = sortValue ? Number(sortValue) : 1;  
    const maxPage = Math.ceil(await products.Product.countDocuments({name: {'$regex': nameFilter, '$options': 'i'}, 
    color: {'$regex': colorFilter}, price: {$gte: lowPivot, $lte: highPivot}}) / maxItem);
    const curPage = req.query.page ? Number(req.query.page) : 1; 
    let queryString = ""; 
    for (i in req.query) {
        if (i != "page") {
            queryString += `${i}=${req.query[i]}&`;
        }
    }
    const pagination = {
        curPage: curPage,
        maxPage: maxPage,
        nextPage: curPage < maxPage ? curPage + 1 : maxPage,
        prevPage: curPage > 1 ? curPage - 1 : 1,
        curQuery: queryString
    } 

    products.Product.find({name: {'$regex': nameFilter, '$options': 'i'}, color: {'$regex': colorFilter, '$options': 'i'}, 
    price: {$gte: lowPivot, $lte: highPivot}}).limit(maxItem).skip((pagination.curPage - 1) * maxItem).sort([[`${sortFilter}`, sortValueFilter]])
    .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.render('product', { productList: data, originalUrl: `${req.baseUrl}?${qs.stringify(withoutFilter)}`, pagination: pagination});
    });
};

const getProductAPI = async (req, res) => {
    const {sort, color, priceRange, sortValue, ...withoutFilter} = req.query;
    const maxItem = 9;

    const nameFilter = withoutFilter.name ?? ''; 
    const colorFilter = color ?? '';
    const sortFilter = sort ?? 'name';
    const lowPivot = priceRange ? Number(priceRange.split('-')[0]) : 0;
    const highPivot = priceRange ? Number(priceRange.split('-')[1]) : 1e9;
    const sortValueFilter = sortValue ? Number(sortValue) : 1;  
    const maxPage = Math.ceil(await products.Product.countDocuments({name: {'$regex': nameFilter, '$options': 'i'}, 
    color: {'$regex': colorFilter}, price: {$gte: lowPivot, $lte: highPivot}}) / maxItem);
    const curPage = req.query.page ? Number(req.query.page) : 1; 

    let query = qs.stringify(req.query, { encode: false });
    query = query.substring(0, query.indexOf('page') - 1);

    const pagination = {
        curPage: curPage,
        maxPage: maxPage,
        nextPage: curPage < maxPage ? curPage + 1 : maxPage,
        prevPage: curPage > 1 ? curPage - 1 : 1,
        curQuery: query
    } 

    products.Product.find({name: {'$regex': nameFilter, '$options': 'i'}, color: {'$regex': colorFilter, '$options': 'i'}, 
    price: {$gte: lowPivot, $lte: highPivot}}).limit(maxItem).skip((pagination.curPage - 1) * maxItem).sort([[`${sortFilter}`, sortValueFilter]])
    .exec((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.send({productList: data, pagination: pagination});
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

module.exports = {
    getProductPage,
    getProductDetailPage,
    getProductAPI
};