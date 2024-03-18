const ControllerBase = require('../../base/controller');

const Joi = require('joi');
module.exports = class UserController extends ControllerBase {
	constructor(userService, currentUser) {
		super();
		this.userService = userService;
		this.currentUser = currentUser;
	}

	async getAll(req, res, next) {
		try {
			// todo: super.getAll then pass all required thing?
			const schema = Joi.object({
				limit: Joi.number().integer(),
				offset: Joi.number().integer(),
				otherData: Joi.boolean(),
			});
			const data = schema.validate(req.query);
			const user = await this.userService.getAll(req.query);
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
