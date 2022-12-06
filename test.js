const dbConnection = require('./config/db/index');
const products = require('./models/Product.model');

const main = async () => {
    await dbConnection();

    // const docs = products.Product.aggregate([{$match: {'name': 'Rose'}}])
    // console.log(docs.name);

    const string = '';

    
    products.Product.find({name: {'$regex': string}}, (err, data) => {
        if (err) {
            console.log(err);
        } 

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].name);
        }
    });
};

main();

