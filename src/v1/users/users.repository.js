module.exports = class UserRepository {
	constructor() {}

	async getAll() {
		return [{ id: '123', name: '456' }];
	}

	async get() {
		return { id: '123', name: '456' };
	}

	async create(data) {
		return { id: '123', ...data };
	}
};
