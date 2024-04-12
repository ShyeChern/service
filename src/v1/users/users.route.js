const UserController = require('./users.controller');
const { string } = require('../../utils');

module.exports = {
	name: string.toCamelCase(UserController.name),
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
