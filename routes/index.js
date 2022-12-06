const homeRouter = require('./Home.route');
const userRouter = require('./User.route');
const productRouter = require('./Product.route');
const cartRouter = require('./Cart.route');

const route = (app) => {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/cart', cartRouter);
}

module.exports = route;