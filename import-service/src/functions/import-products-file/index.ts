import { handlerPath } from '@libs/handler-resolver';
import { StatusCode } from '@libs/http-status-codes';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'import',
                request: {
                    parameters: {
                        querystrings: {
                            name: true
                        },
                    },
                },
                documentation: {
                    summary: 'Import Products File',
                    description: 'Get full list of products fi;e',
                    methodResponses: [
                        {
                            statusCode: StatusCode.OK,
                            responseBody: {
                                description: 'Full list of products file',
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
