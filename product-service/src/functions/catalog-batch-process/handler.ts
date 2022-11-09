import { formatServerErrorJSONResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { IProduct } from 'src/models/product.models';
import { ProductsService } from 'src/services/products.service';
import * as AWS from 'aws-sdk';

const catalogBatchProcess = async (event) => {
    try {
        console.log(`catalogBatchProcess executed`);

        const createdProducts = event.Records.map(async record => {
            console.log('implement logic for creating product', record);
            const productsService = new ProductsService();
            return await productsService.createProduct(record.body as unknown as IProduct);
        });

        await publishMessage(createdProducts);

        return formatJSONResponse({
            data: null,
        });
    } catch (error) {
        return formatServerErrorJSONResponse({
            error,
        });
    }
};

const publishMessage = (createdProducts) => {
    const sns = new AWS.SNS({ region: 'eu-west-1' });

    return sns.publish({
        Subject: 'Product created',
        Message: JSON.stringify(createdProducts),
        TopicArn: 'createProductTopic', //env
    }).promise();
}

export const main = middyfy(catalogBatchProcess);
