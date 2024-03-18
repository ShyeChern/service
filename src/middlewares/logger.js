module.exports = (req, res, next) => {
	req.container.cradle.log('Start request');
	req.container.cradle.log(req.method, req.url, req.body);

	res.on('finish', function () {
		req.container.cradle.log('End request');
	});
	return next();
};
