const { v4 } = require('uuid');
const { asFunction } = require('awilix');

module.exports = (req, res, next) => {
	const requestId = v4();
	const log = function () {
		console.info(new Date().toISOString(), ...arguments);
	};
	req.container.register({ log: asFunction(() => log) });

	log('Start request', requestId);
	log(req.method, req.url, req.body);

	res.on('finish', function () {
		log('End request', requestId);
	});
	return next();
};
