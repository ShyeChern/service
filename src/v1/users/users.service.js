const ServiceBase = require('../../base/service');

module.exports = class UserService extends ServiceBase {
	constructor(opts) {
		super(opts);
		this.userRepository = opts.userRepository;
	}

	async get(params) {
		console.log(params);
		return await this.userRepository.get(params);
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
		return { id: result.id };
	}

	async update(id, data) {
		const result = await this.userRepository.update({ _id: id }, data);
		return { id: result.id };
	}

	async delete(data) {
		const result = await this.userRepository.delete(data);
		return { id: result.id };
	}
};
