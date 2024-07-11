const { listModules } = require('awilix');
const { sort } = require('../utils');

module.exports.runMigrations = async (opts, db) => {
	const seeds = sort(listModules(['./src/databases/seeders/*.seeder.js']), { field: 'name' });
	const migrations = sort(listModules(['./src/databases/migrations/*.migration.js']), {
		field: 'name',
	});

	const seederCollection = db.collection('seeders');
	const migrationCollection = db.collection('migrations');
	const existingSeeders = await seederCollection.find().toArray();
	const existingMigrations = await migrationCollection.find().toArray();

	for (const seed of seeds) {
		if (existingSeeders.find((v) => v._id === seed.name)) continue;
		await opts[seed.name](db);
		await seederCollection.insertOne({ _id: seed.name, createdAt: new Date() });
	}

	for (const migration of migrations) {
		if (existingMigrations.find((v) => v._id === migration.name)) continue;
		await opts[migration.name](db);
		await migrationCollection.insertOne({ _id: migration.name, createdAt: new Date() });
	}

	console.log('migrations completed');
};
