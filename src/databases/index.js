const mongoose = require('mongoose');
const { listModules } = require('awilix');
const models = listModules(['./src/*/*/*.model.js']);

const init = async (opts) => {
	const mongodb = await mongoose.createConnection(process.env.MONGODB_URL).asPromise();

	mongodb.set('debug', process.env.NODE_ENV !== 'production');

	for (let model of models) {
		model = opts[model.name];
		const custom = {};

		if (model.timestamps !== false) model.schema.set('timestamps', true);
		if (model.author !== false) {
			custom.author = true;
			model.schema.add({ createdBy: String, updatedBy: String });
		}
		if (model.paranoid !== false) {
			custom.paranoid = true;
			model.schema.add({ deletedAt: Date, deletedBy: String });
		}

		for (const index of model.compoundIndexes ?? []) {
			model.schema.index(index);
		}

		model.schema.set('custom', custom);

		mongodb.model(model.name, model.schema);
	}
	console.log('connected to database');
	return mongodb;
};

module.exports = {
	init,
};
