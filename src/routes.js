const express = require('express');
const app = express();
const apiV1 = require('./v1/index');
const { app: appConstant } = require('./constants');

app.use('/api/v1', apiV1);

app.use('/*', (req, res) => {
	res.status(appConstant.NOT_FOUND).send(`${req.method} ${req.originalUrl} endpoint not found`);
});

module.exports = app;
