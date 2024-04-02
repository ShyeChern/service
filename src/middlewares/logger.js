module.exports = (req, res, next) => {
	req.container.cradle.log('Start request');
	req.container.cradle.log('headers', JSON.stringify(req.headers));
	req.container.cradle.log(req.method, req.url);
	if (req.method !== 'GET') {
		req.container.cradle.log('body', JSON.stringify(req.body));
	}

	res.on('finish', function () {
		req.container.cradle.log('End request');
	});
	return next();
};
