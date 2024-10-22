const { Schema } = require('mongoose');

module.exports = class UserModel {
	static modelName = 'User';
	static schema = new Schema(
		{ username: String, profileImage: String, password: String },
		{ collection: 'users' },
	);
};
