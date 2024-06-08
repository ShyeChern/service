const Base = require('./base');

module.exports = class ServiceBase extends Base {
	constructor(opts) {
		super(opts);
	}

	async checkConcurrency(prevValue, newValue) {
		console.log(prevValue, newValue);
	}

	async delete(data) {
		console.log(data);
	}
};
