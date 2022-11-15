export class AuthorizationService {
	public generatePolicy(token: string, resource: string, effect?: string) {
		let policyEffect = effect;

		if (!policyEffect) {
			const buffer = Buffer.from(token, 'base64');
			const [username, password] = buffer.toString('utf-8').split(':');

			policyEffect = this.validateCreds(username, password) ? 'Deny' : 'Allow';
		}

		return {
			principalId: token,
			policyDocument: {
				Version: '2012-10-17',
				Statements: [
					{
						Action: 'execute-api:Invoke',
						Effect: policyEffect,
						Resource: resource,
					},
				],
			},
		};
	}

	private validateCreds(username: string, password: string): boolean {
		const storedPassword = process.env[username];
		return !storedPassword || storedPassword !== password;
	}
}
