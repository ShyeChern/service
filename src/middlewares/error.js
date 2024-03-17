const { ErrorBase, ValidationError } = require('../base/error');
const { error } = require('../constants');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	req.container.cradle.log(err);
	if (err instanceof ErrorBase || err instanceof ValidationError) {
		return res.status(err.statusCode).send({ message: err.message, error: err.errors });
	}
	const errorResponse = {
		message: error[500],
	};
	if (process.env.NODE_ENV !== 'production') errorResponse.devError = err.message;
	return res.status(500).send(errorResponse);
};
