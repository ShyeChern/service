const { express } = require('@chern_1997/utils');
const model = require('./audits.model');

module.exports = class AuditRepository extends express.RepositoryBase {
	constructor(opts) {
		super(model, opts);
	}
};
