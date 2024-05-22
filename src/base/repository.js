const Base = require('./base');

module.exports = class RepositoryBase extends Base {
	constructor(model, opts) {
		super(opts);
		this.model = opts.mongodb.models[model.name];
	}

	async getAll(filter, projection, options = {}) {
		options.currentUser = this.currentUser;
		// const result = await this.model.find(filter, projection, options);
		const result = await this.model.aggregate([], options);
		return result;
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

	async aggregate(pipeline, options = {}) {
		options.currentUser = this.currentUser;
		const result = await this.model.aggregate(pipeline, options);
		return result;
	}

	async create(data, options = {}) {
		options.currentUser = this.currentUser;
		if (!Array.isArray(data)) data = [data];
		const result = await this.model.create(data, options);
		return result;
	}

	async update(filter, data, options = {}) {
		if (Object.keys(filter).length === 0 && !options.force)
			throw new Error('Please specify update filter');

		options.currentUser = this.currentUser;
		const result = await this.model.updateMany(filter, data, options);
		return result;
	}

	async delete(filter, options = {}) {
		if (Object.keys(filter).length === 0 && !options.force)
			throw new Error('Please specify delete filter');

		const paranoid = this.model.schema.options.custom.paranoid;
		options.currentUser = this.currentUser;
		// const result = await this.model.updateMany(filter, options);
		const result = await this.model.deleteMany(filter, options);
		return result;
	}
};
