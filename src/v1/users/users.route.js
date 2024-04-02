const UserController = require('./users.controller');
const { stringHelper } = require('../../utils');

module.exports = {
	name: stringHelper.toCamelCase(UserController.name),
	routes: [
		{
			path: '/users',
			get: [UserController.prototype.getAll.name],
			post: [UserController.prototype.create.name],
		},
		{
			path: '/users/:id',
			get: [UserController.prototype.get.name],
		},
	],
};
