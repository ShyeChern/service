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

	async get(params) {
		const filter = {
			_id: params.id,
		};
		const user = await this.userRepository.get(filter);
		if (!user) throw new ErrorBase(this.t('user.notFound'), app.NOT_FOUND);
		return user;
	}

	async getAll(query) {
		const filter = {};
		const result = await this.userRepository.paginate(
			filter,
			{},
			{ limit: query.limit, page: query.page, sorts: query.sorts },
		);
		return result;
	}

	async create(data) {
		// TODO: validate username exists
		data.password = security.hash(data.password);
		const result = await this.userRepository.create(data);
		return { id: result[0]._id };
	}

	async update(id, data) {
		const user = await this.get({ id });
		this.checkConcurrency(user, data);
		await this.userRepository.update({ _id: id }, data);
		return { id };
	}

	async delete(id) {
		await this.get({ id });
		await this.userRepository.delete({ _id: id });
		return { id };
	}
};
