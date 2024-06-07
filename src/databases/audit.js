module.exports = class Audit {
	constructor(opts) {
		this.req = opts.req;
		this.logger = opts.logger;
	}

	getDetail() {}

	create(data, options) {
		try {
			data = Array.isArray(data) ? data : [data];
			const schema = data[0].schema;
			const table = data[0].collection.name;
			for (const value of data) {
				console.log('value', value.toJSON());
			}
		} catch (e) {
			this.logger.error('error create audit', e);
		}
	}

	update() {}

	delete() {}
};
