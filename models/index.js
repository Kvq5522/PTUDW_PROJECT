const mongoose = require('mongoose');
const users = require('./User.model');
const products = require('./Product.model');
const carts = require('./Cart.model');
const orders = require('./Order.model');

//connect local mongo 
mongoose.connect('mongodb://localhost:27017/vocuaba', {
    useNewUrlParser: true
});

const product_1 = new products.Product({
    name: 'rose',
    price: 10,
    description: 'a beautiful red rose',
    image_url: 'mock_1.jpg'
});

const product_2 = new products.Product({
    name: 'daisy',
    price: 5,
    description: 'a beautiful yellow daisy',
    image_url: 'mock_2.jpg'
});

const product_3 = new products.Product({
    name: 'tulip',
    price: 15,
    description: 'a beautiful pink tulip',
    image_url: 'mock_3.jpg'
});

product_1.save();
product_2.save();
product_3.save();

const user_1 = new users.User({
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone_number: '1234567890',
    password: 'password',
    address: '1234 Main St',
    cart: {
        items: [product_1, product_2],
        total: 15
    }
});

const user_2 = new users.User({
    name: 'Jane Doe',
    email: 'janedoe@gmail.com',
    phone_number: '1234567891',
    password: 'password',
    address: '1234 Main St',
    cart: {
        items: [product_1],
        total: 10
    }
});

const user_3 = new users.User({
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    phone_number: '1234567892',
    password: 'password',
    address: '1234 Main St',
    cart: {
        items: [product_2, product_3],
        total: 20
    }
});

user_1.save();
user_2.save();
user_3.save();

const order_1 = new orders.Order({
    username: 'John Doe',
    phone_number: '1234567890',
    address: '1234 Main St',
    items: [product_1, product_2],
    total: 15
});

const order_2 = new orders.Order({
    username: 'Jane Doe',
    phone_number: '1234567891',
    address: '1234 Main St',
    items: [product_1],
    total: 10
});

const order_3 = new orders.Order({
    username: 'John Smith',
    phone_number: '1234567892',
    address: '1234 Main St',
    items: [product_2, product_3],
    total: 20
});

order_1.save();
order_2.save();
order_3.save();

console.log('Database seeded');




