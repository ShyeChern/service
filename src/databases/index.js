const mongoose = require('mongoose');
const { listModules } = require('awilix');
const { initMiddleware } = require('./middlewares');
const { runMigrations } = require('./migrations');

module.exports.init = async (opts) => {
	const mongodb = await mongoose.createConnection(process.env.MONGODB_URL).asPromise();

	if (process.env.NODE_ENV !== 'production') {
		mongoose.set('debug', function (collectionName, methodName, ...methodArgs) {
			delete methodArgs[1]?.auditService;
			delete methodArgs[2]?.auditService;
			console.log(
				`Mongoose: ${collectionName}.${methodName}(${methodArgs.map(JSON.stringify).join(', ')})`,
			);
		});
	}

	const models = listModules(['./src/*/*/*.model.js']);

	for (let model of models) {
		model = opts[model.name];
		const custom = {
			author: false,
			paranoid: false,
		};

		if (model.timestamps !== false) model.schema.set('timestamps', true);

		if (model.author !== false) {
			custom.author = true;
			model.schema.add({
				createdBy: { id: String, username: String },
				updatedBy: { id: String, username: String },
			});
		}

		if (model.paranoid !== false) {
			custom.paranoid = true;
			model.schema.add({ deletedAt: Date, deletedBy: { id: String, username: String } });
		}

		for (const index of model.compoundIndexes ?? []) {
			model.schema.index(index);
		}

		model.schema.set('custom', custom);

		model = initMiddleware(model, custom);

		mongodb.model(model.name, model.schema);
	}
	console.log('connected to database');

	await runMigrations(opts, mongodb);

	return mongodb;
};
