const { expressCore } = require('@chern_1997/utils');

(async () => {
	await expressCore.init({
		middlewares: [],
		whitelistUrl: {
			'/api/v1/auth/login': true,
		},
	});
})();
