const Base = require('./base');

module.exports = class RepositoryBase extends Base {
	constructor(model, opts) {
		super(opts);
		this.model = opts.mongodb.models[model.name];
		this.audit = opts.audit;
	}

	passOption(options) {
		options.currentUser = this.currentUser;
		options.audit = this.audit;
		return options;
	}

	async getAll(filter, projection, options = {}) {
		options = this.passOption(options);
		// const result = await this.model.find(filter, projection, options);
		const result = await this.model.aggregate([], options);
		return result;
	}

	async get(filter, projection, options = {}) {
		options = this.passOption(options);
		const result = await this.model.findOne(filter, projection, options);
		return result;
	}

	async aggregate(pipeline, options = {}) {
		options = this.passOption(options);
		const result = await this.model.aggregate(pipeline, options);
		return result;
	}

	async create(data, options = {}) {
		options = this.passOption(options);
		let result;
		if (Array.isArray(data)) result = await this.model.insertMany(data, options);
		else result = await this.model.create([data], options);

		return result;
	}

	async update(filter, data, options = {}) {
		if (Object.keys(filter).length === 0 && !options.force)
			throw new Error('Please specify update filter');

		options = this.passOption(options);
		const result = await this.model.updateMany(filter, data, options);
		return result;
	}

	async delete(filter, options = {}) {
		if (Object.keys(filter).length === 0 && !options.force)
			throw new Error('Please specify delete filter');

		const paranoid = this.model.schema.options.custom.paranoid;
		options = this.passOption(options);
		let result;
		if (paranoid) {
			options.timestamps = false;
			options.isDelete = true;
			result = await this.update(
				filter,
				{
					deletedAt: new Date().toISOString(),
					deletedBy: {
						id: this.currentUser.id,
						name: this.currentUser.name,
					},
				},
				options,
			);
		} else result = await this.model.updateMany(filter, options);
		return result;
	}
};
