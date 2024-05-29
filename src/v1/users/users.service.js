const ErrorBase = require('../../base/error');
const ServiceBase = require('../../base/service');
const { app } = require('../../constants');

module.exports = class UserService extends ServiceBase {
	constructor(opts) {
		super(opts);
		this.userRepository = opts.userRepository;
	}

	async get(params) {
		console.log(params);
		const user = await this.userRepository.get(params);
		if (!user) throw new ErrorBase(this.t('usernotfound'), app.NOT_FOUND);
		return user;
	}

	async getAll(query) {
		const result = await this.userRepository.getAll(query);
		return {
			data: result,
			...query,
		};
	}

	async create(data) {
		const result = await this.userRepository.create(data);
		return { id: result._id };
	}

	async update(id, data) {
		const user = await this.userRepository.get({ _id: id });
		if (!user) throw new ErrorBase(this.t('usernotfound'), app.NOT_FOUND);

		await this.userRepository.update({ _id: id }, data);
		return { id };
	}

	async delete(data) {
		const result = await this.userRepository.delete(data);
		return { id: result._id };
	}
};
