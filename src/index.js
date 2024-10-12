const path = require('path');
require('dotenv').config({
	path: path.resolve(process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'),
});
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const middleware = require('./middlewares');
const container = require('./container');
const port = process.env.PORT;

(async () => {
	const app = express();
	app.use(cors({ origin: true, credentials: true }));
	app.use(helmet());
	app.use(middleware.createScope);
	app.use(middleware.i18n);
	app.use(
		rateLimit({
			limit: 100,
			standardHeaders: true,
			legacyHeaders: false,
		}),
	);
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(compression());
	app.use(middleware.logger);
	app.use(middleware.cache);
	app.use(cookieParser(process.env.COOKIE_SIGNAGURE));
	app.use(require('./routes'));
	app.use(middleware.error);

	await container.cradle.init();

	app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
})();
