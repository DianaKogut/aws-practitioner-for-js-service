import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'
import type { FromSchema } from 'json-schema-to-ts';
import { StatusCode } from './http-status-codes';

const headers = {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': 'https://d2khn404ig5sop.cloudfront.net',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
};

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
	return {
		statusCode: StatusCode.OK,
		headers,
		body: JSON.stringify(response)
	};
}

export const formatBadRequestJSONResponse = (response: Record<string, unknown>) => {
	return {
		statusCode: StatusCode.BadRequest,
		headers,
		body: `Bad Request: ${response?.errorMessage}`,
	};
}
