const { asValue } = require('awilix');
const ErrorBase = require('../base/error');
const { error, cache, app } = require('../constants');
const { security } = require('@chern_1997/utils');

module.exports = async (req, res, next) => {
	const whitelistUrl = {
		'/api/v1/auth/login': true,
	};

	if (whitelistUrl[req.path]) return next();

	if (!req.headers.authorization) {
		return next(new ErrorBase(req.__('error.unauthorized'), app.UNAUTHORIZED));
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
	} catch (err) {
		req.container.cradle.logger.info(err);

		if (err instanceof ErrorBase) return next(err);

		const params = {
			statusCode: app.UNAUTHORIZED,
		};
		if (err.name === 'TokenExpiredError') params.code = error.TOKEN_EXPIRED;

		return next(new ErrorBase(req.__('error.unauthorized'), params));
	}
	return next();
};
