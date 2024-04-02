const { ValidationError } = require('./error');
module.exports = class Base {
	constructor(opts) {
		this.currentUser = opts.currentUser;
		this.t = opts.t;
		this.log = opts.log;
	}

	async validate(schema, data, options = {}) {
		options = {
			abortEarly: false,
			errors: {
				wrap: {
					label: false,
				},
			},
			messages: {
				cn: { 'object.unknown': '{:#label} some error' },
				'object.unknown': 'FIELD_NOT_ALLOWED',
			},
			...options,
		};
		const { value, error } = await schema.validate(data, options);

		if (!error) return value;

		const errors = error.details.map((v) => ({
			message: v.message,
			type: v.type,
			value: v.context.value,
			key: v.path.reduce((acc, cur) => {
				if (typeof cur === 'string') {
					if (acc) acc += '.';
					acc += cur;
				} else {
					acc += `[${cur}]`;
				}
				return acc;
			}, ''),
		}));
		throw new ValidationError(this.t('common.test'), errors);
	}
};
