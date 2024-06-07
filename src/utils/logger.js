module.exports = class Logger {
	constructor(opts) {
		this.requestId = opts.requestId;
	}

	log() {
		console.log(new Date().toISOString(), this.requestId, ...arguments);
	}

	info() {
		console.info(new Date().toISOString(), this.requestId, ...arguments);
	}

	error() {
		console.error(new Date().toISOString(), this.requestId, ...arguments);
	}
};
