const AuthController = require('./auth.controller');
const { stringHelper } = require('../../utils');

module.exports = {
	name: stringHelper.toCamelCase(AuthController.name),
	routes: [
		{
			path: '/auth/login',
			post: [AuthController.prototype.login.name],
		},
	],
};
