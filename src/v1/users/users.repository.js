const RepositoryBase = require('../../base/repository');
const model = require('./users.model');
const BaseError = require('../../base/error');
const { app } = require('../../constants');

module.exports = class UserRepository extends RepositoryBase {
	constructor(opts) {
		super(model, opts);
	}

	async verifyUser(user) {
		user = await super.get(user);
		// throw new BaseError(this.t('can do some user status checking'), {
		// 	statusCode: app.FORBIDDEN,
		// });
		return user;
	}
};
