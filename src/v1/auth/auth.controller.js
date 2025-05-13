const { expressCore } = require('@chern_1997/utils');
const authValidator = require('./auth.validator');

module.exports = class AuthController extends expressCore.ControllerBase {
	/**
	 * Authentication controller
	 *
	 * @param {Object} opts
	 * @param {import('./auth.service')} opts.authService
	 */
	constructor(opts) {
		super(opts);
		this.authService = opts.authService;
	}

	async login(req, res, next) {
		try {
			const data = await super.validate(authValidator.login, req.body);
			const result = await this.authService.login(data);
			return res.send(result);
		} catch (error) {
			next(error);
		}
	}
};
