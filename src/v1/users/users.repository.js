const RepositoryBase = require('../../base/repository');
module.exports = class UserRepository extends RepositoryBase {
	constructor(opts) {
		super(opts);
	}

	async getAll(filter) {
		return [{ id: '123', name: '456' }];
	}

	async get(filter) {
		return {
			id: '123',
			name: '456',
			username: 'admin',
			password:
				'295030d21c9022764c7661b4ffde7c6570409e7c9ee18b8b3bdaba23ad50a12d92bec6acb80314761137dc4c3abf81e44e1e4503ed24a9459a7464987c168820:e6dc851a6a41928db699c2da98b52903',
		};
	}

	async create(data) {
		return { id: '123', ...data };
	}
};
