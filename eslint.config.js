const globals = require('globals');
const pluginJs = require('@eslint/js');

module.exports = [
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	{
		files: ['tests/**/*'],
		languageOptions: { globals: globals.jest },
	},
	{
		rules: {
			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'prefer-const': 'error',
		},
	},
];
