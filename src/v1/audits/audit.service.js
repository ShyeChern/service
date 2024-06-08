const ServiceBase = require('../../base/service');

module.exports = class AuditService extends ServiceBase {
	constructor(opts) {
		super(opts);
		this.req = opts.req;
		this.auditRepository = opts.auditRepository;
	}

	getDetail() {}

	async createLog(data, options) {
		try {
			data = Array.isArray(data) ? data : [data];
			const schema = data[0].schema;
			const table = data[0].collection.name;
			for (const value of data) {
				console.log('value', value.toJSON());
				this.auditRepository.create({});
			}
		} catch (e) {
			this.logger.error('error create audit', e);
		}
	}

	async updateLog(query, prevValues) {
		try {
			if (prevValues.length === 0) return;
			const newValues = await query.model.find(
				query.getFilter(),
				{},
				{ lean: true, skipMiddleware: true },
			);
			// TODO: find and compare
		} catch (e) {
			this.logger.error('error update audit', e);
		}
	}

	async deleteLog(query, prevValues) {
		try {
			if (prevValues.length === 0) return;
			console.log(prevValues);
		} catch (e) {
			this.logger.error('error update audit', e);
		}
	}
};
