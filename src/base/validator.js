const Joi = require('joi');

module.exports.pagination = Joi.object({
	limit: Joi.number().min(0).default(10),
	offset: Joi.number().min(0).default(10),
	page: Joi.number().min(1).default(1),
});
