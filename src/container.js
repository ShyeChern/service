const {
	createContainer,
	InjectionMode,
	asClass,
	asValue,
	Lifetime,
	asFunction,
} = require('awilix');
const { logger } = require('./utils');
const { stringHelper } = require('./utils');
const { v4 } = require('uuid');

const init = () => {
	return async () => {
		console.log('init app');
	};
};

const createScope = () => {
	return () => {
		const requestId = v4();
		const scope = container.createScope();
		const log = function () {
			logger.log.call(null, requestId, ...arguments);
		};
		scope.register({
			currentUser: asValue({}),
			log: asFunction(() => log).scoped(),
			requestId: asValue(requestId),
		});
		return scope;
	};
};

const container = createContainer({
	strict: true,
	injectionMode: InjectionMode.CLASSIC,
});

container.loadModules(
	[
		['./src/*/*/*.controller.js', { register: asClass, lifetime: Lifetime.SCOPED }],
		['./src/*/*/*.service.js', { register: asClass, lifetime: Lifetime.SCOPED }],
		['./src/*/*/*.repository.js', { register: asClass, lifetime: Lifetime.SINGLETON }],
	],
	{
		formatName: (name, descriptor) => {
			if (name.includes('controller')) return descriptor.value.name;
			return stringHelper.toCamelCase(descriptor.value.name);
		},
	},
);

container.register({
	init: asFunction(init),
	createScope: asFunction(createScope).singleton(),
});

module.exports = container;
