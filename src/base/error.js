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

		if (typeof params === 'string') {
			this.setCode(params);
			this.setStatusCode(400);
			return;
		}

		if (typeof params === 'number') {
			this.setStatusCode(params);
			return;
		}

		this.setStatusCode(params?.statusCode ?? 400);
		this.setErrors(params?.errors);
		this.setCode(params?.code);
	}

	setStatusCode(statusCode) {
		this.statusCode = statusCode;
	}

	setErrors(errors) {
		this.errors = errors;
	}

	setCode(code) {
		this.code = code;
	}
};
