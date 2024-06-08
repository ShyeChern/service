const auditModel = require('../v1/audits/audit.model');
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
		if (custom.author && update && !options.isDelete) {
			const author = {
				id: options.currentUser.id,
				name: options.currentUser.name,
			};
			update.updatedBy = author;
			update.$setOnInsert.createdBy = author;
		}

		if (update || options.isDelete)
			this.prevValues = await this.model.find(filter, {}, { lean: true, skipMiddleware: true });

		return next();
	},
	post: function (result, next) {
		const options = this.options;

		if (options.skipMiddleware) return next();

		if (options.isDelete) options.auditService.deleteLog(this, this.prevValues);
		else options.auditService.updateLog(this, this.prevValues);
		return next();
	},
};

const DOCUMENT = {
	pre: function (next) {
		const custom = this.constructor.schema.options.custom;
		const options = this.$__.saveOptions;

		if (custom.author) {
			const author = {
				id: options.currentUser.id,
				name: options.currentUser.name,
			};
			this.updatedBy = author;
			this.createdBy = author;
		}
		return next();
	},
	post: function (doc, next) {
		if (this.constructor.modelName === auditModel.name) return next();

		const options = this.$__.saveOptions;
		options.auditService.createLog(doc, options);

		return next();
	},
};

const AGGREGATE = {
	pre: function (next) {
		const custom = this._model.schema.options.custom;
		// const options = this.options;
		if (custom.paranoid) {
			this.pipeline().unshift({ $match: { deletedAt: { $eq: null } } });
		}
		return next();
	},
};

const MODEL = {
	pre: function (next, data, options) {
		const custom = this.schema.options.custom;
		if (custom.author) {
			const author = {
				id: options.currentUser.id,
				name: options.currentUser.name,
			};

			for (const value of data) {
				value.updatedBy = author;
				value.createdBy = author;
			}
		}
		this.options = options;
		return next();
	},
	post: function (data, next) {
		this.options.auditService.createLog(data, this.options);
		return next();
	},
};

module.exports.initMiddleware = (model) => {
	const schema = model.schema;
	schema.pre(/^find/, QUERY.pre);
	schema.pre(/^update/, QUERY.pre);
	schema.post(/^update/, QUERY.post);
	schema.pre(/^delete/, QUERY.pre);
	schema.post(/^delete/, QUERY.post);

	schema.pre('save', DOCUMENT.pre);
	schema.post('save', DOCUMENT.post);
	schema.pre('insertMany', MODEL.pre);
	schema.post('insertMany', MODEL.post);

	schema.pre('aggregate', AGGREGATE.pre);

	return model;
};