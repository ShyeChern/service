const container = require('../container');

module.exports = (req, res, next) => {
	req.container = container.createScope();
	return next();
};
