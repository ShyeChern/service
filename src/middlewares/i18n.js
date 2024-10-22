const path = require('node:path');
const fs = require('node:fs');
const { I18n } = require('i18n');
const { listModules } = require('awilix');
const { array } = require('@chern_1997/utils');
const { uniques: namespaces } = array.removeDuplicates(listModules(['./src/locales/**/*.json']), {
	field: 'name',
});

const locales = fs.readdirSync('./src/locales/');
const staticCatalog = {};
for (const locale of locales) {
	staticCatalog[locale] = {};
	for (const namespace of namespaces) {
		staticCatalog[locale][namespace] = JSON.parse(
			fs.readFileSync(path.join(__dirname, `../locales/${locale}/${namespace}.json`), {
				encoding: 'utf8',
			}),
		);
	}
}
const i18n = new I18n({
	locales: locales,
	directory: path.join(__dirname, 'locales'),
	staticCatalog,
	objectNotation: true,
});

module.exports = i18n.init;
