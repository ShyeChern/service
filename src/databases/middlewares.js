const QUERY = {
	pre: function (next) {
		const custom = this.schema.options.custom;
		const options = this.options;
		next();
	},
	post: function (next) {},
};

const DOCUMENT = {
	pre: function (next) {
		const custom = this.constructor.schema.options.custom;
		const options = this.$__.saveOptions;
		next();
	},
	post: function (doc, next) {
		//
		console.log('%s has been saved', doc._id);
		next();
	},
};

const AGGREGATE = {
	pre: function (next) {
		const custom = this._model.schema.options.custom;
		const options = this.options;
		this.pipeline().unshift({ $match: { deletedAt: { $eq: null } } });
		next();
	},
};

const MODEL = {
	pre: function (next, data, options) {
		const custom = this.schema.options.custom;
		next();
	},
	post: function (next, data, options) {
		next();
	},
};

module.exports.initMiddleware = (model) => {
	const options = model.schema.options.custom;
	const schema = model.schema;
	schema.pre(/^find/, QUERY.pre);
	schema.post(/^find/, QUERY.post);
	// TODO: update
	// TODO: delete
	schema.pre('save', DOCUMENT.pre);
	schema.post('save', DOCUMENT.post);

	schema.pre('insertMany', MODEL.pre);
	schema.post('insertMany', MODEL.post);
	schema.pre('bulkWrite', MODEL.pre);
	schema.post('bulkWrite', MODEL.post);
	// if (options.paranoid)
	schema.pre('aggregate', AGGREGATE.pre);

	return model;
};
