import { formatJSONResponse, formatServerErrorJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ImportService } from 'src/services/import.service';

const importFileParser = async (event) => {
    try {
        console.log('importFileParser executed');
        const importService = new ImportService();

        importService.getS3Object(event.Records[0]);

        return formatJSONResponse({
            data: null,
        });
    } catch (error) {
        return formatServerErrorJSONResponse({
            error,
        });
    }
};

export const main = middyfy(importFileParser);
