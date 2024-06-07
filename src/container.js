const {
	createContainer,
	InjectionMode,
	asClass,
	asValue,
	Lifetime,
	asFunction,
} = require('awilix');
const { string } = require('./utils');
const { v4 } = require('uuid');
const { cache } = require('./constants');
const NodeCache = require('node-cache');
const database = require('./databases');

const init = (opts) => {
	return async () => {
		const mongodb = await database.init(opts);
		const appCache = new NodeCache();
		appCache.set(cache.ROLE, {});
		container.register({ cache: asValue(appCache), mongodb: asValue(mongodb) });
		console.log('init app');
	};
};

const createScope = () => {
	return (req) => {
		const requestId = v4();
		const scope = container.createScope();
		scope.register({
			currentUser: asValue({}),
			requestId: asValue(requestId),
			req: asValue(req),
		});
		return scope;
	};
};

const container = createContainer({
	strict: true,
	injectionMode: InjectionMode.PROXY,
});

container.loadModules(
	[
		['./src/*/*/*.controller.js', { register: asClass, lifetime: Lifetime.SCOPED }],
		['./src/*/*/*.service.js', { register: asClass, lifetime: Lifetime.SCOPED }],
		['./src/*/*/*.repository.js', { register: asClass, lifetime: Lifetime.SCOPED }],
		['./src/*/*/*.model.js', { register: asValue, lifetime: Lifetime.SINGLETON }],
		['./src/utils/logger.js', { register: asClass, lifetime: Lifetime.SCOPED }],
		['./src/databases/audit.js', { register: asClass, lifetime: Lifetime.SCOPED }],
	],
	{
		formatName: (name, descriptor) => {
			if (name.includes('.model')) return name;
			return string.toCamelCase(descriptor.value.name);
		},
	},
);

container.register({
	init: asFunction(init),
	createScope: asFunction(createScope).singleton(),
});

module.exports = container;
