const RepositoryBase = require('../../base/repository');
module.exports = class UserRepository extends RepositoryBase {
	constructor(opts) {
		super(opts);
	}

	async getAll(filter) {
		return [{ id: '123', name: '456' }];
	}

	async get(filter) {
		return { id: '123', name: '456', username: 'admin', password: 'P@ssw0rd' };
	}

	async create(data) {
		return { id: '123', ...data };
	}
};
