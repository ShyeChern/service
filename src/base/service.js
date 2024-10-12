const { app } = require('../constants');
const Base = require('./base');
const ErrorBase = require('./error');

module.exports = class ServiceBase extends Base {
	constructor(opts) {
		super(opts);
	}

	checkConcurrency(prevValue, newValue) {
		if (new Date(prevValue.updatedAt).getTime() > new Date(newValue.updatedAt).getTime()) {
			throw new ErrorBase(this.t('validation.concurrency'));
		}
		delete newValue.updatedBy;
	}

	async delete(data) {
		console.log(data);
	}
};
