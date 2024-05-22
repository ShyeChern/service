const Base = require('./base');

module.exports = class ServiceBase extends Base {
	constructor(opts) {
		super(opts);
	}

	async delete(data) {
		console.log(data);
	}
};
