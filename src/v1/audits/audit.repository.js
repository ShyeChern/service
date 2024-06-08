const RepositoryBase = require('../../base/repository');
const model = require('./audit.model');

module.exports = class AuditRepository extends RepositoryBase {
	constructor(opts) {
		super(model, opts);
	}
};
