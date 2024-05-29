const QUERY = {
	pre: async function (next) {
		const custom = this.schema.options.custom;
		const options = this.options;

		if (options.skipMiddleware) return next();

		const filter = this.getFilter();
		if (custom.paranoid && filter) {
			this.getFilter().deletedAt = null;
		}

		const update = this.getUpdate();
		if (custom.author && update) {
			const author = {
				id: options.currentUser?.id,
				name: options.currentUser?.name,
			};
			update.updatedBy = author;
			update.$setOnInsert.createdBy = author;

			// this.oldValue = await this.model.find(filter, {}, { lean: true, skipMiddleware: true });
		}
		return next();
	},
	post: function (result, next) {
		const options = this.options;

		if (options.skipMiddleware) return next();

		// TODO: audit.update(this, this.oldValue, result)
		return next();
	},
};

const DOCUMENT = {
	pre: function (next) {
		const custom = this.constructor.schema.options.custom;
		const options = this.$__.saveOptions;
		if (custom.author) {
			const author = {
				id: options.currentUser?.id,
				name: options.currentUser?.name,
			};
			this.updatedBy = author;
			this.createdBy = author;
		}
		return next();
	},
	post: function (doc, next) {
		// TODO: audit.create(doc) // doc.toJSON(), doc.collection.name
		return next();
	},
};

const AGGREGATE = {
	pre: function (next) {
		const custom = this._model.schema.options.custom;
		const options = this.options;
		this.pipeline().unshift({ $match: { deletedAt: { $eq: null } } });
		return next();
	},
};

const MODEL = {
	pre: function (next, data, options) {
		const custom = this.schema.options.custom;
		return next();
	},
	post: function (next, data, options) {
		return next();
	},
};

module.exports.initMiddleware = (model) => {
	const schema = model.schema;
	schema.pre(/^find/, QUERY.pre);
	schema.pre(/^update/, QUERY.pre);
	schema.post(/^update/, QUERY.post);
	// TODO: delete
	schema.pre('save', DOCUMENT.pre);
	schema.post('save', DOCUMENT.post);

	schema.pre('insertMany', MODEL.pre);
	schema.post('insertMany', MODEL.post);
	schema.pre('bulkWrite', MODEL.pre);
	schema.post('bulkWrite', MODEL.post);
	schema.pre('aggregate', AGGREGATE.pre);

	return model;
};
