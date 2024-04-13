const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

module.exports.hash = (text) => {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.scryptSync(text, salt, 64).toString('hex');
	return `${hash}:${salt}`;
};

module.exports.compareHash = (text, hashed) => {
	const [hash, salt] = hashed.split(':');
	if (!hash || !salt) return false;
	const hashedText = crypto.scryptSync(text, salt, 64);
	const result = crypto.timingSafeEqual(hashedText, Buffer.from(hash, 'hex'));
	return result;
};
