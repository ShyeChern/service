const { app } = require('../constants');
const Base = require('./base');
const ErrorBase = require('./error');

module.exports = class ServiceBase extends Base {
	constructor(opts) {
		super(opts);
	}

	checkConcurrency(prevValue, newValue) {
		if (prevValue.updatedAt?.toISOString() !== newValue.updatedAt) {
			throw new ErrorBase(this.t('validation.concurrency'));
		}
		delete newValue.updatedBy;
	}

	async delete(data) {
		console.log(data);
	}
};
