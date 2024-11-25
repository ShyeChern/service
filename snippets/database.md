```js
// databases/migrations/202407111936-init.migration.js
module.exports = async (db) => {
	await db.collection('collection_name').updateMany({}, { $set: { updateField: 'updated value' } });
};
```

```js
// databases/seeders/202407111936-init.seeder.js
module.exports = async (db) => {
	await db.collection('collection_name').insertMany([{ field: 'value' }, { field: 'value' }]);
};
```
