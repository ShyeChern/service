const { error } = require('../constants');

class ErrorBase extends Error {
	constructor(message, statusCode, error) {
		super(message);
		this.error = error;
		this.statusCode = statusCode ?? 400;
	}
}

class ValidationError extends Error {
	constructor(errors) {
		super(error.VALIDATION_ERROR);
		this.errors = errors;
		this.statusCode = 400;
	}
}

module.exports = {
	ErrorBase,
	ValidationError,
};
