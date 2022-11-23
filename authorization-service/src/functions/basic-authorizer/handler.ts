import { middyfy } from '@libs/lambda';
import { AuthorizationService } from 'src/services/authorization.service';

const authorizerType = 'TOKEN';

const basicAuthorizer = async (event) => {
	const { authToken = '', methodArn } = event;
	const authorizerService = new AuthorizationService();

	if (event?.type !== authorizerType) {
		return authorizerService.generatePolicy(authToken, methodArn, 'Deny');
	}

	try {
		const policy = authorizerService.generatePolicy(
			authToken,
			methodArn,
			event.methodArn
		);

		return policy;
	} catch (err) {
		return authorizerService.generatePolicy(authToken, methodArn, 'Deny');
	}
};

export const main = middyfy(basicAuthorizer);