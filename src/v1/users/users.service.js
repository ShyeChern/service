const { ErrorBase, ValidationError } = require('../../base/error');
const ServiceBase = require('../../base/service');
module.exports = class UserService extends ServiceBase {
	constructor(opts) {
		super(opts);
		this.userRepository = opts.userRepository;
	}

	async get(params) {
		// throw new Error('qwe');
		// throw new ValidationError([{ message: '' }]);
		// throw new ErrorBase('some message');
		console.log(params);
		return await this.userRepository.get(params);
	}

	async getAll(query) {
		// throw new Error('qwe');
		// throw new ValidationError([{ message: '' }]);
		// throw new ErrorBase('some message');
		this.log('qwe', 'asd');
		const result = await this.userRepository.getAll(query);
		return {
			data: result,
			...query,
		};
	}

	async create(data) {
		return await this.userRepository.create(data);
	}
};
