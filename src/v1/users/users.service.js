const { security } = require('@chern_1997/utils');
const ErrorBase = require('../../base/error');
const ServiceBase = require('../../base/service');
const { app } = require('../../constants');

module.exports = class UserService extends ServiceBase {
	/**
	 * @param {Object} opts - options
	 * @param {import('./users.repository')} opts.userRepository
	 */
	constructor(opts) {
		super(opts);
		this.userRepository = opts.userRepository;
	}

	async create(data) {
		// TODO: validate username exists
		data.password = security.hash(data.password);
		const result = await this.userRepository.create(data);
		return { id: result[0]._id };
	}
};
