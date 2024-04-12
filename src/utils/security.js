const jwt = require('jsonwebtoken');
const { app } = require('../constants');

module.exports.generateToken = (payload, options = {}) => {
	let secret = process.env.JWT_SECRET;
	options = {
		issuer: app.NAME,
		...options,
	};
	if (!options.expiresIn) options.expiresIn = 60 * 10;
	if (options.refresh) {
		secret += '_refresh';
		delete options.refresh;
	}
	const token = jwt.sign(payload, secret, options);
	return token;
};

module.exports.verifyToken = (token, options = {}) => {
	let secret = process.env.JWT_SECRET;
	options = {
		issuer: app.NAME,
		...options,
	};
	if (options.refresh) {
		secret += '_refresh';
		delete options.refresh;
	}
	const payload = jwt.verify(token, secret, options);
	return payload;
};

// TODO: scrypt
