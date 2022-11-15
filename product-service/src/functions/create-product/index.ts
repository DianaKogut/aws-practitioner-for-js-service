import { ProductSchema } from 'src/schemes/product.schema';
import { handlerPath } from '@libs/handler-resolver';
import { StatusCode } from '@libs/http-status-codes';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'post',
                path: 'products',
                request: {
                    schemas: {
                        'application/json': ProductSchema,
                    }
                },
                documentation: {
                    summary: 'Create New Product',
                    description: 'Create New Product',
                    methodResponses: [
                        {
                            statusCode: StatusCode.OK,
                            responseBody: {
                                description: 'New product created',
                            },
                            responseModels: {},
                        },
                        {
                            statusCode: StatusCode.BadRequest,
                            responseBody: {
                                description: 'Bad Request',
                            },
                            responseModels: {},
                        },
                        {
                            statusCode: StatusCode.ServerError,
                            responseBody: {
                                description: 'Internal Server Error',
                            },
                            responseModels: {},
                        },
                    ],
                },

            },
        },
    ],
};
