const path = require('node:path');
const multer = require('multer');
const { format } = require('date-fns');
const { array } = require('@chern_1997/utils');
const { error: errorCode, file } = require('../constants');
const ErrorBase = require('./error');

module.exports = class Base {
	constructor(opts) {
		this.currentUser = opts.currentUser;
		this.t = opts.req.__;
		this.logger = opts.logger;
	}

	getEntity() {
		const entity = this.constructor.name.replace(/(Service|Controller|Repository)$/, '');
		return entity.charAt(0).toLowerCase() + entity.slice(1);
	}

	async validate(schema, data, options = {}) {
		options = {
			abortEarly: false,
			errors: {
				wrap: {
					label: false,
				},
			},
			stripUnknown: true,
			...options,
		};
		const { value, error } = await schema.validate(data, options);

		if (!error) return value;

		// TODO: change to object
		const errors = error.details.map((v) => ({
			message: v.message,
			type: v.type,
			value: v.context.value,
			key: v.path.reduce((acc, cur) => {
				if (typeof cur === 'string') {
					if (acc) acc += '.';
					acc += cur;
				} else {
					acc += `[${cur}]`;
				}
				return acc;
			}, ''),
		}));
		throw new ErrorBase(this.t('validation.error'), { code: errorCode.VALIDATION_ERROR, errors });
	}

	async validateFile(req, res, options = {}) {
		const storage = multer.diskStorage({
			destination: options.destination,
			filename: function (req, file, cb) {
				const uniqueSuffix = `${Math.floor(Math.random() * 1e9) + 1e9}${format(Date.now(), 'yyyyMMddHHmmss')}`;
				const { name, ext } = path.parse(file.originalname);
				cb(null, `${name}_${uniqueSuffix}${ext}`);
			},
		});

		const fileSize = options.fileSize ?? file.SIZE['10MB'];
		const upload = multer({
			storage: storage,
			limits: { fileSize },
		}).any();

		const promise = await new Promise((resolve, reject) => {
			upload(req, res, (err) => {
				req.files = array.groupBy(req.files ?? [], { field: 'fieldname' });

				this.logger.info('form data body', JSON.stringify(req.body));
				this.logger.info(
					'form data files',
					JSON.stringify(req.files, (key, value) => {
						if (key === 'data') return '';
						return value;
					}),
				);

				if (err instanceof multer.MulterError && err.code === file.MULTER_ERROR_CODE.FILE_SIZE) {
					reject(
						new ErrorBase(
							this.t('validation.fileLimitExceeded', {
								fileSize: `${Math.round(fileSize / file.SIZE['1MB'])}MB`,
							}),
							[
								{
									message: err.message,
									type: err.code,
									key: err.field,
								},
							],
						),
					);
				} else if (err) {
					reject(err);
				}
				resolve(true);
			});
		});
		return promise;
	}
};
