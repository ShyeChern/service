const Joi = require('joi');
const validator = require('../../base/validator');

module.exports = class UserValidator {
	create = Joi.object({
		username: Joi.string().required(),
		password: Joi.string()
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[\w\W]{8,}$/)
			.required(),
		profileImage: Joi.array().length(1).items(validator.image).label('profile image'),
	});
	update = Joi.object({
		password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[\w\W]{8,}$/),
	});
};
