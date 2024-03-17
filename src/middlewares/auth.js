const { asValue } = require('awilix');

module.exports = (req, res, next) => {
	console.log('TODO: auth');
	const user = { someinfo: '123', id: Math.floor(Math.random() * 100) };
	req.container.register({
		currentUser: asValue(user),
	});
	console.log(req.container.cradle.currentUser);
	return next();
};
