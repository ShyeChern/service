const express = require('express');
const router = express.Router();
const { listModules } = require('awilix');

const handler = (controller, methodName) => {
	return function (req, res, next) {
		return req.container.cradle[controller][methodName](req, res, next);
	};
};

module.exports = (opts) => {
	const modules = listModules(['./src/v1/*/*.route.js']);
	for (const module of modules) {
		const data = opts[module.name];
		const entity = data.name.replace(/Route$/, '');
		const controllerName = entity.charAt(0).toLowerCase() + entity.slice(1) + 'Controller';

		for (const route of data.routes) {
			const methods = Object.keys(route).filter((v) => v !== 'path');
			for (const method of methods) {
				const length = route[method].length;
				route[method][length - 1] = handler(controllerName, route[method][length - 1]);
				router[method](route.path, route[method]);
			}
		}
	}
	return router;
};
