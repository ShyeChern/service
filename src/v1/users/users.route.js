const UserController = require('./users.controller');

module.exports = class UserRoute {
	static routes = [
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
	];
};
