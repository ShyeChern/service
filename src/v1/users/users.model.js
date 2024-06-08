const { Schema } = require('mongoose');

module.exports = class UserModel {
	static name = 'User';
	static schema = new Schema({ name: String, email: String }, { collection: 'users' });
};
