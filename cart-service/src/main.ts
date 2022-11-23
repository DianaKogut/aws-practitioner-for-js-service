import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler;

async function bootstrap(): Promise<Handler> {
	const app = await NestFactory.create(AppModule);

	await app.init();

	app.enableCors({
		origin: (req, callback) => callback(null, true),
	});

	const expressApp = app.getHttpAdapter().getInstance();

	return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
	event: any,
	context: Context,
	callback: Callback,
) => {
	server = server ?? (await bootstrap());
	return server(event, context, callback);
};