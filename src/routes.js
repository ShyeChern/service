const express = require('express');
const app = express();
const apiV1 = require('./v1/index');
const middleware = require('./middlewares');
const { app: appConstant } = require('./constants');

module.exports = (opts) => {
	app.use('/api/v1', middleware.auth, apiV1(opts));

	app.use('/*', (req, res) => {
		res.status(appConstant.NOT_FOUND).send(`${req.method} ${req.originalUrl} endpoint not found`);
	});

	return app;
};
