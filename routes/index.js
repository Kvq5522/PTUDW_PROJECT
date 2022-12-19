const homeRouter = require('./home.route');
const userRouter = require('./user.route');
const productRouter = require('./product.route');
const authRouter = require('./Auth.route');

const route = (app) => {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/auth', authRouter);
}

module.exports = route;