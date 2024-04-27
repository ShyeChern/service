const RepositoryBase = require('../../base/repository');
const model = require('./users.model');
module.exports = class UserRepository extends RepositoryBase {
	constructor(opts) {
		super(model, opts);
	}
};
