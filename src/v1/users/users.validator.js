const Joi = require('joi');
const validator = require('../../base/validator');

module.exports.getAll = validator.pagination.concat(
	Joi.object({
		otherData: Joi.boolean().label('other data'),
	}),
);
