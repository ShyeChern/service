const { Schema } = require('mongoose');

module.exports = class UserModel {
	// paranoid filter null
	// prefix field company etc
	static name = 'User';
	static schema = new Schema({ name: String, email: String }, { collection: 'users' });
};
