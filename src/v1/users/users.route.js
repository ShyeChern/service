const UserController = require('./users.controller');

module.exports = {
	name: UserController.name,
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
