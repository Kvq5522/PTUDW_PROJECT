const homeRouter = require('./Home.route');
const userRouter = require('./User.route');
const productRouter = require('./Product.route');
const cartRouter = require('./Cart.route');
const authRouter = require('./Auth.route');

const route = (app) => {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/cart', cartRouter);
    app.use('/auth', authRouter);
}

module.exports = route;