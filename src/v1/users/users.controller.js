const { expressCore, constants } = require('@chern_1997/utils');
const { file } = require('../../constants');

module.exports = class UserController extends expressCore.ControllerBase {
	/**
	 * @param {Object} opts
	 * @param {import('./users.service')} opts.userService
	 * @param {import('./users.validator')} opts.userValidator
	 */
	constructor(opts) {
		super(opts);
		this.userService = opts.userService;
		this.userValidator = opts.userValidator;
	}

	async create(req, res, next) {
		try {
			const isMultipart = req.headers['content-type']?.includes('multipart/form-data');
			if (isMultipart) {
				await super.validateFile(req, res, { destination: file.DIRECTORY.PROFILE_IMAGE });
			}
			const data = await super.validate(this.userValidator.create, {
				...req.body,
				...req.files,
			});

			if (data.profileImage) {
				data.profileImage = data.profileImage[0].path;
			}
			const user = await this.userService.create(data);
			return res.status(constants.app.CREATED).send(user);
		} catch (error) {
			next(error);
		}
	}
};
