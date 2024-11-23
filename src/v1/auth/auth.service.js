const { security, express, BaseError } = require('@chern_1997/utils');

module.exports = class AuthService extends express.ServiceBase {
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
