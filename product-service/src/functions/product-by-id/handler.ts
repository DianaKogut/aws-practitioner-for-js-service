import { getMockedProducts } from '@functions/mock/products-mock';
import { formatBadRequestJSONResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';

const getProductsById = async (event: APIGatewayEvent) => {
	const productId = event.pathParameters?.id;
	const productsList = await getMockedProducts();
	const product = productsList.find(product => product.id === productId);

	if (!product) {
		return formatBadRequestJSONResponse({
			errorMessage: 'Product Not Found',
		});
	}

	return formatJSONResponse({
		data: product,
	});
};

export const main = middyfy(getProductsById);
