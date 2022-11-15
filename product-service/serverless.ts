import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/products-list';
import getProductsById from '@functions/product-by-id';
import createProduct from '@functions/create-product';
import catalogBatchProcess from '@functions/catalog-batch-process';

const serverlessConfiguration: AWS = {
	service: 'product-service',
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
			DYNAMODB_PRODUCTS_TABLE: 'products',
			DYNAMODB_STOCKS_TABLE: 'stocks',
			QUEUE_NAME: 'catalogItemsQueue',
			SNS_TOPIC_NAME: 'createProductTopic',
		},
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: [
							'dynamodb:Query',
							'dynamodb:Scan',
							'dynamodb:GetItem',
							'dynamodb:PutItem',
							'dynamodb:UpdateItem',
							'dynamodb:DeleteItem',
						],
						Resource: [
							'arn:aws:dynamodb:${aws:region}:*:table/${self:provider.environment.DYNAMODB_PRODUCTS_TABLE}',
							'arn:aws:dynamodb:${aws:region}:*:table/${self:provider.environment.DYNAMODB_STOCKS_TABLE}',
						]

					},
					{
						Effect: 'Allow',
						Action: [
							'sqs:*',
						],
						Resource: [{
							'Fn::GetAtt': ['SQSQueue', 'Arn'],
						}],
					},
					{
						Effect: 'Allow',
						Action: [
							'sqs:*',
						],
						Resource: [{
							Ref: 'SNSTopic',
						}],
					},
				],
			},
		},
	},
	// import the function via paths
	functions: { getProductsList, getProductsById, createProduct, catalogBatchProcess },
	resources: {
		Resources: {
			SQSQueue: {
				Type: 'AWS::SQS::Queue',
				Properties: {
					// QueueName: 'catalogItemsQueue'
					QueueName: '${self:provider.environment.QUEUE_NAME}'
				}
			},
			SNSTopic: {
				Type: 'AWS::SNS::Topic',
				Properties: {
					TopicName: '${self:provider.environment.SNS_TOPIC_NAME}',
				}
			},
			SNSSubscription: {
				Type: 'AWS::SNS::Subscription',
				Properties: {
					Endpoint: 'dianakogut088@gmail.com',
					Protocol: 'email',
					TopicArn: {
						Ref: 'SNSTopic',
					}
				}
			}
		}
	},
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
