import { handlerPath } from '@libs/handler-resolver';
import { StatusCode } from '@libs/http-status-codes';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'products/{id}',
				request: {
					parameters: {
						paths: {
							id: true
						},
					},
				},
				documentation: {
					summary: 'Get Product By Id',
					description: 'Get Product By Id',
					pathParams: {
						name: 'id',
						description: 'The ID of the requested product',
						schema: {
							type: 'string',
							pattern: "^[-a-z0-9_]+$"
						},
					},
					methodResponses: [
						{
							statusCode: StatusCode.OK,
							responseBody: {
								description: 'Founded product',
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
