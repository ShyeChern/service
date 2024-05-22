const Base = require('./base');

module.exports = class ControllerBase extends Base {
	constructor(opts) {
		super(opts);
	}

	async checkAccess() {
		// TODO: check access func
	}
};
