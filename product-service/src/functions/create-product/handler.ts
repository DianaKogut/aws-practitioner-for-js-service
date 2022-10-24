import { formatServerErrorJSONResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { IProduct } from 'src/models/product.models';
import { ProductsService } from 'src/services/products.service';

const createProduct = async (event: APIGatewayEvent) => {
    try {
        console.log(`createProduct executed, body: ${JSON.stringify(event.body)}`);

        const productsService = new ProductsService();
        const createdProduct = await productsService.createProduct(event.body as unknown as IProduct);

        return formatJSONResponse({
            data: createdProduct,
        });
    } catch (error) {
        return formatServerErrorJSONResponse({
            error,
        });
    }
};

export const main = middyfy(createProduct);
