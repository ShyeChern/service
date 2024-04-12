const { asValue } = require('awilix');
const ErrorBase = require('../base/error');
const { error, cache } = require('../constants');
const { security } = require('../utils');

module.exports = async (req, res, next) => {
	const whitelistUrl = {
		'/api/v1/auth/login': true,
	};

	if (whitelistUrl[req.path]) return next();

	if (!req.headers.authorization) {
		return next(new ErrorBase(req.__('error.unauthorized'), 401));
	}

	try {
		const token = req.headers.authorization.replace('Bearer ', '');
		let user = security.verifyToken(token);
		user = await req.container.cradle.userRepository.get({ user });
		user.access = req.container.cradle.cache.get(cache.ROLE)[user.role];
		req.container.register({
			currentUser: asValue(user),
		});
		req.container.cradle.userRepository.currentUser = user;
	} catch (e) {
		req.container.cradle.log(e);
		const params = {
			statusCode: 401,
		};
		if (e.name === 'TokenExpiredError') params.code = error.TOKEN_EXPIRED;

		return next(new ErrorBase(req.__('error.unauthorized'), params));
	}
	return next();
};
