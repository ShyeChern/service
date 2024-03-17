const path = require('path');
require('dotenv').config({
	path: path.resolve(process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'),
});
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares');
const port = process.env.PORT;

(async () => {
	const app = express();
	app.use(cors({ origin: true, credentials: true }));
	app.use(helmet());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(compression());
	app.use(middlewares.createScope);
	app.use(middlewares.logger);
	app.use(cookieParser(process.env.COOKIE_SIGNAGURE));
	app.use(middlewares.auth);
	app.use(require('./routes'));
	app.use(middlewares.error);

	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
})();
