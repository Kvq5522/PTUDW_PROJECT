const dbConnection = require('./config/db/index');
const products = require('./models/Product.model');

const main = async () => {
    await dbConnection();

    // const docs = products.Product.aggregate([{$match: {'name': 'Rose'}}])
    // console.log(docs.name);

    const array = [
        '638ef16c59bca6b785a7531e', '638ef21a59bca6b785a75328'
    ]

    const result = await products.Product.find({'_id': {$in: array}});

    console.log(result);
};

main();

