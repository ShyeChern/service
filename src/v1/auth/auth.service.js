const { security } = require('@chern_1997/utils');
const ServiceBase = require('../../base/service');
const BaseError = require('../../base/error');

module.exports = class AuthService extends ServiceBase {
	/**
	 * @param {Object} opts - options
	 * @param {import('../users/users.repository')} opts.userRepository
	 */
	constructor(opts) {
		super(opts);
		this.userRepository = opts.userRepository;
	}

	async login(data) {
		const user = await this.userRepository.get({ username: data.username });
		if (!user) {
			throw new BaseError(this.t('user.invalidCredential'));
		}

		if (!security.verifyHash(data.password, user.password)) {
			throw new BaseError(this.t('user.invalidCredential'));
		}

		// TODO: provide required info
		const accessToken = security.generateToken(user);
		const refreshToken = security.generateToken(user, { expiresIn: '1d', refresh: true });

		return { accessToken, refreshToken };
	}
};
