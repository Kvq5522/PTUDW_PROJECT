const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const port = 3000;
const router = require('./routes/index');

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

router(app);

app.listen(port, () => console.log(`App is listening on port ${port}!`));