const Base = require('./base');

module.exports = class ControllerBase extends Base {
	constructor(model) {
		super();
		console.log(model);
	}

	async getAll(req, res, next) {
		try {
			const Joi = require('joi');
			const schema = Joi.object({
				limit: Joi.number().integer(),
				offset: Joi.number().integer(),
				otherData: Joi.boolean(),
			});
			const data = schema.validate(req.query);
			const user = await this.userService.getAll(req.query);
			return res.send({ ...user, success: 'success' });
		} catch (err) {
			next(err);
		}
	}
};
