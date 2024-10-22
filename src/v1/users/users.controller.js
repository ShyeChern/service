const ControllerBase = require('../../base/controller');
const { app, file } = require('../../constants');
const userValidator = require('./users.validator');

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
		} catch (error) {
			next(error);
		}
	}

	async get(req, res, next) {
		try {
			const user = await this.userService.get(req.params);
			return res.send(user);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			await super.validateFile(req, res, { destination: file.DIRECTORY.PROFILE_IMAGE });
			const data = await super.validate(userValidator.create, { ...req.body, ...req.files });
			if (data.profileImage) {
				data.profileImage = data.profileImage[0].path;
			}
			const user = await this.userService.create(data);
			return res.status(app.CREATED).send(user);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const user = await this.userService.update(req.params.id, req.body);
			return res.send(user);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const user = await this.userService.delete(req.params.id);
			return res.send(user);
		} catch (error) {
			next(error);
		}
	}
};
