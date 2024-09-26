const ServiceBase = require('../../base/service');
const BaseError = require('../../base/error');
const { security } = require('@chern_1997/utils');

module.exports = class AuthService extends ServiceBase {
	constructor(opts) {
		super(opts);
		this.userRepository = opts.userRepository;
	}

	async login(data) {
		const user = await this.userRepository.get({});
		if (!user) {
			throw new BaseError(this.t('user.invalidCredential'));
		}

		const userPassword = Buffer.from(data.password, 'base64').toString('utf-8');
		if (!security.compareHash(userPassword, user.password)) {
			throw new BaseError(this.t('user.invalidCredential'));
		}

		const accessToken = security.generateToken(user);
		const refreshToken = security.generateToken(user, { expiresIn: '1d', refresh: true });

		return { accessToken, refreshToken };
	}
};
