const AuthController = require('./auth.controller');

module.exports = class AuthRoute {
	static routes = [
		{
			path: 'auth/login',
			post: [AuthController.prototype.login.name],
		},
	];
};
