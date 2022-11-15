import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/import-products-file';
import importFileParser from '@functions/import-file-parser';

const serverlessConfiguration: AWS = {
	service: 'import-service',
	frameworkVersion: '3',
	useDotenv: true,
	plugins: ['serverless-esbuild', 'serverless-openapi-documentation'],
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		region: 'eu-west-1',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
			BUCKET_NAME: 'aws-for-js-practitioner-uploaded',
		},
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: 's3:ListBucket',
						Resource: [
							'arn:aws:s3:::aws-for-js-practitioner-uploaded',
						],
					},
					{
						Effect: 'Allow',
						Action: 's3:*',
						Resource: [
							'arn:aws:s3:::aws-for-js-practitioner-uploaded/*',
						],
					}
				]
			}
		},
	},
	functions: { importProductsFile, importFileParser },
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
	},
};

module.exports = serverlessConfiguration;
