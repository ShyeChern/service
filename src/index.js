const { express } = require('@chern_1997/utils');

(async () => {
	await express.init({
		middlewares: [],
		whitelistUrl: {
			'/api/v1/auth/login': true,
		},
	});
})();
