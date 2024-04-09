const ErrorBase = require('../base/error');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	if (err instanceof ErrorBase) {
		return res
			.status(err.statusCode)
			.send({ message: err.message, code: err.code, errors: err.errors });
	}
	req.container.cradle.log('error middleware', err);
	const errorResponse = {
		message: req.__('error.serverError'),
		requestId: req.container.cradle.requestId,
	};
	if (process.env.NODE_ENV !== 'production') errorResponse.devError = err.message;
	return res.status(500).send(errorResponse);
};
