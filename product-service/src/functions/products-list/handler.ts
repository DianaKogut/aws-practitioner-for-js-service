import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductsService } from 'src/services/products.service';

const getProductsList = async () => {
	try {
		console.log('getProductsList executed');

		const productsService = new ProductsService();
		const products = await productsService.getProducts();

		return formatJSONResponse({
			data: products,
		});
	} catch (err) {
		return formatJSONResponse({
			data: { err },
		});
	}
};

export const main = middyfy(getProductsList);
