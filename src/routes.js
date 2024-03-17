const express = require('express');
const app = express();
const apiV1 = require('./v1/index');

app.use('/api/v1', apiV1);

app.use('/*', (req, res) => {
	res.status(404).send(`${req.method} ${req.originalUrl} endpoint not found`);
});

module.exports = app;
