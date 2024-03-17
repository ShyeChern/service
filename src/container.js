const { createContainer, InjectionMode, asClass, asValue, Lifetime } = require('awilix');
const { stringHelper } = require('./utils');
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
	currentUser: asValue({}),
});
module.exports = container;
