module.exports = class ErrorBase extends Error {
	constructor(message, params) {
		super(message);
		this.processParams(params);
	}

	processParams(params) {
		if (Array.isArray(params)) {
			this.setErrors(params);
			this.setStatusCode(400);
			return;
		}

		if (typeof params === 'number') {
			this.setStatusCode(params);
			return;
		}

		this.setStatusCode(params.statusCode);
		this.setErrors(params.errors);
	}

	setStatusCode(statusCode) {
		this.statusCode = statusCode;
	}

	setErrors(errors) {
		this.errors = errors;
	}
};
