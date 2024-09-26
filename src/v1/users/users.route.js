const UserController = require('./users.controller');
const { string } = require('@chern_1997/utils');

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
			patch: [UserController.prototype.update.name],
			delete: [UserController.prototype.delete.name],
		},
	],
};
