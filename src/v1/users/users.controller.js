const ControllerBase = require('../../base/controller');
const userValidator = require('./users.validator');
const { app } = require('../../constants');

module.exports = class UserController extends ControllerBase {
	constructor(opts) {
		super(opts);
		this.userService = opts.userService;
	}

	async getAll(req, res, next) {
		try {
			// TODO: super.getAll then pass all required thing?
			const data = await super.validate(userValidator.getAll, req.query);
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
			return res.status(app.CREATED).send(user);
		} catch (err) {
			next(err);
		}
	}

	async update(req, res, next) {
		try {
			const user = await this.userService.update(req.params.id, req.body);
			return res.send(user);
		} catch (err) {
			next(err);
		}
	}

	async delete(req, res, next) {
		try {
			const user = await this.userService.delete(req.params.id);
			return res.send(user);
		} catch (err) {
			next(err);
		}
	}
};
