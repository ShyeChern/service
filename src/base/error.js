const { app } = require('../constants');
module.exports = class ErrorBase extends Error {
	/**
	 * @param {String} message
	 * @param {*} params
	 */
	constructor(message, params) {
		super(message);
		this.processParams(params);
	}

	processParams(params) {
		if (typeof params === 'string') {
			this.setCode(params);
			this.setStatusCode(app.BAD_REQUEST);
			return;
		}

		if (typeof params === 'number') {
			this.setStatusCode(params);
			return;
		}

		this.setStatusCode(params?.statusCode ?? app.BAD_REQUEST);
		this.setError(params?.error);
		this.setCode(params?.code);
	}

	setStatusCode(statusCode) {
		this.statusCode = statusCode;
	}

	setError(error) {
		this.error = error;
	}

	setCode(code) {
		this.code = code;
	}
};
