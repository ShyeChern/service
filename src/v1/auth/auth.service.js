const jwt = require('jsonwebtoken');
const { app } = require('../../constants');
const ServiceBase = require('../../base/service');
const BaseError = require('../../base/error');

module.exports = class AuthService extends ServiceBase {
	constructor(opts) {
		super(opts);
		this.userRepository = opts.userRepository;
	}

	async login() {
		const user = await this.userRepository.get({});
		if (!user) {
			throw new BaseError(this.t('user.invalidCredential'));
		}

		const accessToken = this.generateToken(user);
		const refreshToken = this.generateToken(user, { expiresIn: '1d' });

		return { accessToken, refreshToken };
	}

	generateToken(payload, options) {
		options = {
			issuer: app.NAME,
			expiresIn: 60 * 10,
			...options,
		};
		if (!options.expiresIn) delete options.expiresIn;
		const token = jwt.sign(payload, process.env.JWT_SECRET, options);
		return token;
	}

	verifyToken(token) {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		return payload;
	}

	// TODO: scrypt
};
