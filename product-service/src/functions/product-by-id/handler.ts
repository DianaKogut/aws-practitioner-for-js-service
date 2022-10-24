import { formatBadRequestJSONResponse, formatServerErrorJSONResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { ProductsService } from 'src/services/products.service';

const getProductsById = async (event: APIGatewayEvent) => {
	try {
		const productId = event.pathParameters?.id;

		console.log(`getProductsById executed, product id: ${productId}`)

		const productsService = new ProductsService();
		const product = await productsService.getProductById(productId);

		if (!product) {
			return formatBadRequestJSONResponse({
				errorMessage: 'Product Not Found',
			});
		}

		return formatJSONResponse({
			data: product,
		});
	} catch (error) {
		return formatServerErrorJSONResponse({
			error,
		});
	}
};

export const main = middyfy(getProductsById);
