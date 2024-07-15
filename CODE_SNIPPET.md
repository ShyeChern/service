### Mongoose Transaction

```javascript
await this.repository.mongodb.transaction(async (session) => {
	// your logic here, eg:
	await this.repository.create(data, { session });
	await this.repository.update(filter, data, { session });
});
```

### Mongodb Migration

```javascript
const mongoose = require('mongoose');

module.exports = async (db) => {
	const collection = db.collection('users');
	await db.transaction(async (session) => {
		// your logic here, eg:
		await collection.insertOne({ field: 'data' }, { session });
		await collection.updateOne(
			{ _id: new mongoose.Types.ObjectId('66951b80a2e99988cbd0148f') },
			{ $set: { field: 'updated' } },
			{ session },
		);
	});
};
```
