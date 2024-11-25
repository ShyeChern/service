const {
	express: { container },
} = require('@chern_1997/utils');

module.exports = (req, res, next) => {
	req.container = container.cradle.createScope(req);
	return next();
};
