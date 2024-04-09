module.exports = (req, res, next) => {
	req.container.cradle.log('Start request');
	req.container.cradle.log('headers', JSON.stringify(req.headers));
	req.container.cradle.log(req.method, req.url);
	if (req.method !== 'GET') {
		req.container.cradle.log('body', JSON.stringify(req.body));
	}

	const send = res.send;
	res.send = (responseBody) => {
		req.container.cradle.log('response', JSON.stringify(responseBody));
		res.send = send;
		return res.send(responseBody);
	};

	res.on('finish', function () {
		req.container.cradle.log('End request');
	});
	return next();
};
