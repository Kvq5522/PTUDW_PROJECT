const homeRouter = require('./home.route');
const userRouter = require('./user.route');
const productRouter = require('./product.route');
const cartRouter = require('./cart.route');

const route = (app) => {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/cart', cartRouter);
}

module.exports = route;