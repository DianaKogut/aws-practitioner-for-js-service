import { handlerPath } from '@libs/handler-resolver';
import { StatusCode } from '@libs/http-status-codes';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'products',
				request: {},
				documentation: {
					summary: 'Get Products List',
					description: 'Get full list of products',
					methodResponses: [
						{
							statusCode: StatusCode.OK,
							responseBody: {
								description: 'Full list of products',
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
					],
				},
			},
		},
	],
};
