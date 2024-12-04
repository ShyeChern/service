const { security, express, BaseError, constants } = require('@chern_1997/utils');

module.exports = class UserService extends express.ServiceBase {
	/**
	 * @param {Object} opts
	 * @param {import('./users.repository')} opts.userRepository
	 */
	constructor(opts) {
		super(opts);
		this.userRepository = opts.userRepository;
	}

	async create(data) {
		const user = await this.userRepository.get({ username: data.username });
		if (user) {
			throw new BaseError(
				this.t('user.usernameExists', { username: data.username }),
				constants.app.CONFLICT,
			);
		}
		data.password = security.hash(data.password);
		const result = await this.userRepository.create(data);
		return { id: result[0]._id };
	}

	async update(id, data) {
		const user = await this.get({ id });
		this.checkConcurrency(user, data);
		if (data.password) data.password = security.hash(data.password);
		await this.getRepository().update({ _id: id }, data);
		return { id };
	}
};
