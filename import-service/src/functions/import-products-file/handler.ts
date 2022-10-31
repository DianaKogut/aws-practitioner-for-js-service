import { formatBadRequestJSONResponse, formatJSONResponse, formatServerErrorJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent } from 'aws-lambda';
import { ImportService } from 'src/services/import.service';

const importProductsFile = async (event: APIGatewayEvent) => {
	try {
		console.log('importProductsFile executed');
		const fileName = event.queryStringParameters?.name;

		if (!fileName) {
			return formatBadRequestJSONResponse({
				errorMessage: 'FileName is required',
			});
		}

		const importService = new ImportService();
		const signedURL = await importService.getFilesList(fileName);

		return formatJSONResponse({
			data: signedURL,
		});
	} catch (error) {
		return formatServerErrorJSONResponse({
			error,
		});
	}
};

export const main = middyfy(importProductsFile);
