const dbConnection = require('./config/db/index');
const products = require('./models/Product.model');
const mailer = require('./config/mailer/index');

mailer.sendMail('vinhkhangquach2002@gmail.com', 'Test', '<h1>Test</h1>');

console.log('Done');

