const express = require('express');
const router = express.Router();

const datas = [require('./users/users.route')];

const handler = (controller, methodName) => {
	return function (req, res, next) {
		return req.container.cradle[controller][methodName](req, res, next);
	};
};

for (const data of datas) {
	for (const route of data.routes) {
		const methods = Object.keys(route).filter((v) => v !== 'path');

		for (const method of methods) {
			const length = route[method].length;
			route[method][length - 1] = handler(data.name, route[method][length - 1]);

			router[method](route.path, route[method]);
		}
	}
}

module.exports = router;
