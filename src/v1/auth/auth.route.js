const { string } = require('@chern_1997/utils');
const AuthController = require('./auth.controller');

module.exports = {
	name: string.toCamelCase(AuthController.name),
	routes: [
		{
			path: '/auth/login',
			post: [AuthController.prototype.login.name],
		},
	],
};
