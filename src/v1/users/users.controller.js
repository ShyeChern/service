const ControllerBase = require('../../base/controller');
const userValidator = require('./users.validator');

module.exports = class UserController extends ControllerBase {
	constructor(opts) {
		super(opts);
		this.userService = opts.userService;
	}

	async getAll(req, res, next) {
		try {
			// todo: super.getAll then pass all required thing?
			const data = await this.validate(userValidator.getAll, req.query);
			const user = await this.userService.getAll(data);
			return res.send(user);
		} catch (err) {
			next(err);
		}
	}

	async get(req, res, next) {
		try {
			const user = await this.userService.get(req.params);
			return res.send(user);
		} catch (err) {
			next(err);
		}
	}

	async create(req, res, next) {
		try {
			const user = await this.userService.create(req.body);
			return res.status(201).send(user);
		} catch (err) {
			next(err);
		}
	}
};
