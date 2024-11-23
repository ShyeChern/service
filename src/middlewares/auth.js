const { asValue } = require('awilix');
const { security, BaseError } = require('@chern_1997/utils');
const { error, cache, app } = require('../constants');

module.exports = async (req, res, next) => {
	const whitelistUrl = {
		'/api/v1/auth/login': true,
	};

	if (whitelistUrl[req.originalUrl]) return next();

	if (!req.headers.authorization) {
		return next(new BaseError(req.__('error.unauthorized'), app.UNAUTHORIZED));
	}

	try {
		const token = req.headers.authorization.replace('Bearer ', '');
		let user = security.verifyToken(token);
		user = await req.container.cradle.userRepository.verifyUser(user);
		user.access = req.container.cradle.cache.get(cache.ROLE)[user.role];
		req.container.register({
			currentUser: asValue(user),
		});
		req.container.cradle.userRepository.currentUser = user;
	} catch (error) {
		req.container.cradle.logger.info(error);

		if (error instanceof BaseError) return next(error);

		const params = {
			statusCode: app.UNAUTHORIZED,
		};
		if (error.name === 'TokenExpiredError') params.code = error.TOKEN_EXPIRED;

		return next(new BaseError(req.__('error.unauthorized'), params));
	}
	return next();
};
