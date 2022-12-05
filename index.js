require('dotenv').config({});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT;
const router = require('./routes/index');
const dbConnection = require('./config/db/index');
const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

dbConnection();

router(app);

app.listen(port, () => console.log(`App is listening on port ${port}!`));