const RepositoryBase = require('../../base/repository');
const BaseError = require('../../base/error');
const { app } = require('../../constants');
const model = require('./users.model');

module.exports = class UserRepository extends RepositoryBase {
	constructor(opts) {
		super(model, opts);
	}

	// TODO: put in somewhere that can be reuse across services
	async verifyUser(user) {
		// user = await super.get(user);
		// throw new BaseError(this.t('can do some user status checking'), {
		// 	statusCode: app.FORBIDDEN,
		// });
		return user;
	}
};
