import { getMockedProducts } from '@functions/mock/products-mock';
import { IProduct } from 'src/models/product.models';
import * as AWS from 'aws-sdk';

AWS.config.region = 'eu-west-1';

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const generateParamsForProduct = (item: IProduct) => ({
    TableName: process.env.DYNAMODB_PRODUCTS_TABLE,
    Item: {
        'id': { S: item.id },
        'title': { S: item.title },
        'description': { S: item.description },
        'price': { N: `${item.price}` },
    }
});

const generateParamsForStocks = (item: IProduct) => ({
    TableName: process.env.DYNAMODB_STOCKS_TABLE,
    Item: {
        'product_id': { S: item.id },
        'count': { N: `${item.count}` },
    }
});

const post = (params) => {
    ddb.putItem(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

const fillTables = async () => {
    const products = await getMockedProducts();

    products.forEach(product => {
        post(generateParamsForProduct(product));
        post(generateParamsForStocks(product));
    });
}

fillTables();
