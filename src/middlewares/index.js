const auth = require('./auth');
const createScope = require('./create-scope');
const logger = require('./logger');
const error = require('./error');

module.exports = {
	auth,
	createScope,
	logger,
	error,
};
