const { Schema } = require('mongoose');

module.exports = class UserModel {
	static modelName = 'User';
	static schema = new Schema(
		{ username: { type: String, index: true }, profileImage: String, password: String },
		{ collection: 'users' },
	);
};
