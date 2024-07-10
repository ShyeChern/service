const RepositoryBase = require('../../base/repository');
const model = require('./audits.model');

module.exports = class AuditRepository extends RepositoryBase {
	constructor(opts) {
		super(model, opts);
	}
};
