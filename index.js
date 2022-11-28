const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.use(session({
    secret: "79bcca27f38f32e3aa043f416e78fcf0",
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('./index');
});

app.get('/product', (req, res) => {
    res.render('./product');
});

app.get('/product/:productID', (req, res) => {
    res.render('./product_detail');
});

app.get('/user', (req, res) => {
   if (!req.isAuthenticated()) {
        res.redirect('/signin');
   }
});

app.get('/signin', (req, res) => {
    res.render('./signin');
});

app.get('/signup', (req, res) => {
    res.render('./signup');
});

app.get('/about', (req, res) => {
    res.send('about')
});

app.get('/cart', (req, res) => {
    res.render('./cart');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));