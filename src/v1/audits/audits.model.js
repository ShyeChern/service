const { Schema } = require('mongoose');

module.exports = class AuditRepository {
	static modelName = 'Audit';
	static schema = new Schema(
		{
			method: String,
			path: String,
			collection: String,
			action: String,
			operation: String,
			identifier: Schema.ObjectId,
			prevValue: Object,
			newValue: Object,
		},
		{ collection: 'audits' },
	);
};
