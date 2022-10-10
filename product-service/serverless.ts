import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/products-list';
import getProductsById from '@functions/product-by-id';

const serverlessConfiguration: AWS = {
	service: 'product-service',
	frameworkVersion: '3',
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
		},
	},
	// import the function via paths
	functions: { getProductsList, getProductsById },
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
		documentation: {
			version: '1',
			title: 'Products Service',
			description: 'API for Products Service',
			models: {},
		},
	},
};

module.exports = serverlessConfiguration;
