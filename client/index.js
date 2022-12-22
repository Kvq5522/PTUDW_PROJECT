require('dotenv').config({});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const port = process.env.PORT;
const router = require('./routes/index');
const dbConnection = require('./config/db/index');
let passport = require('passport');
const users = require('./models/User.model');
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

//setup passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(users.User.createStrategy());
passport.serializeUser(function (user, done) {      
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {      
    users.User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.set('view engine', 'ejs');

dbConnection();

router(app);

app.listen(port, () => console.log(`App is listening on port ${port}!`));