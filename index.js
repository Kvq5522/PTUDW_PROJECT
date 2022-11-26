const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('./index');
});

app.get('/shop', (req, res) => {
    res.render('./shop');
});

app.get('/product/:productID', (req, res) => {
    res.render('./product');
});

app.get('/cart', (req, res) => {
    res.render('./cart');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));