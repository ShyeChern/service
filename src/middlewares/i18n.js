const { I18n } = require('i18n');
const path = require('path');
const fs = require('fs');

const namespaces = ['validation', 'error', 'user'];
const locales = ['en', 'cn'];
const staticCatalog = {};
for (const locale of locales) {
	staticCatalog[locale] = {};
	for (const namespace of namespaces) {
		staticCatalog[locale][namespace] = JSON.parse(
			fs.readFileSync(path.join(__dirname, `../locales/${locale}/${namespace}.json`)),
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
