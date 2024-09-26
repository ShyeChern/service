const ServiceBase = require('../../base/service');
const { app } = require('../../constants');
const { object } = require('@chern_1997/utils');

module.exports = class AuditService extends ServiceBase {
	constructor(opts) {
		super(opts);
		this.req = opts.req;
		this.auditRepository = opts.auditRepository;
	}

	getDetail() {
		const detail = {
			method: this.req.method,
			path: this.req.originalUrl,
		};

		return detail;
	}

	async createLog(data, options) {
		try {
			data = Array.isArray(data) ? data : [data];
			const details = {
				...this.getDetail(),
				collection: data[0].collection.name,
				action: app.ACTION.CREATE,
				operation: data[0].$op,
			};

			for (const value of data) {
				this.auditRepository.create(
					{ ...details, identifier: value._id, newValue: value.toJSON() },
					options,
				);
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

			const details = {
				...this.getDetail(),
				collection: query._collection.collectionName,
				action: app.ACTION.UPDATE,
				operation: query.op,
			};

			for (const value of prevValues) {
				const newValue = newValues.find((v) => v._id.toString() === value._id.toString());
				const diff = object.getDiff(value, newValue);
				this.auditRepository.create(
					{ ...details, identifier: value._id, prevValue: diff.old, newValue: diff.new },
					query.options,
				);
			}
		} catch (e) {
			this.logger.error('error update audit', e);
		}
	}

	async deleteLog(query, prevValues) {
		try {
			if (prevValues.length === 0) return;
			const details = {
				...this.getDetail(),
				collection: query._collection.collectionName,
				action: app.ACTION.DELETE,
				operation: query.op,
			};

			for (const value of prevValues) {
				this.auditRepository.create(
					{ ...details, identifier: value._id, prevValue: value },
					query.options,
				);
			}
		} catch (e) {
			this.logger.error('error update audit', e);
		}
	}
};
