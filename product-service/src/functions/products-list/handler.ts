import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getMockedProducts } from '../mock/products-mock';

const getProductsList = async () => {
	const productsList = await getMockedProducts();
	return formatJSONResponse({
		data: productsList,
	});
};

export const main = middyfy(getProductsList);
