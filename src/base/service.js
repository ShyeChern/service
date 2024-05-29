const Base = require('./base');

module.exports = class ServiceBase extends Base {
	constructor(opts) {
		super(opts);
	}

	async checkConcurrency(oldValue, newValue) {
		console.log(oldValue, newValue);
	}

	async delete(data) {
		console.log(data);
	}
};
