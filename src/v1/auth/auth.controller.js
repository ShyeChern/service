const ControllerBase = require('../../base/controller');
const authValidator = require('./auth.validator');

module.exports = class AuthController extends ControllerBase {
	constructor(opts) {
		super(opts);
		this.authService = opts.authService;
	}

	async login(req, res, next) {
		try {
			const data = await this.validate(authValidator.login, req.body);
			const result = await this.authService.login(data);
			return res.send(result);
		} catch (err) {
			next(err);
		}
	}
};
