const getConverter = (options) => {
	if (options.converter) return options.converter;
	if (!options.converter && options.field) return (v) => v[options.field];

	return (v) => v;
};

module.exports.sort = (arr, options = {}) => {
	const multiplier = options.isReverse ? -1 : 1;
	const converter = getConverter(options);
	const numeric = options.numeric ?? false;
	const compare =
		options.compare ?? new Intl.Collator(undefined, { sensitivity: 'base', numeric }).compare;

	const result = arr.toSorted((a, b) => {
		const valueA = converter(a);
		const valueB = converter(b);

		return multiplier * compare(valueA, valueB);
	});

	return result;
};

module.exports.removeDuplicates = (arr, options = {}) => {
	const converter = getConverter(options);

	const seen = {};
	const uniqueArray = arr.filter((v) => {
		const value = converter(v);
		if (Object.prototype.hasOwnProperty.call(seen, value)) return false;
		if (!value && value !== 0) return false;

		seen[value] = value;
		return true;
	});

	if (options.uniques) return { result: uniqueArray, uniques: Object.values(seen) };

	return uniqueArray;
};

module.exports.getUniques = (...rest) => {
	if (!rest[1]) rest[1] = {};
	rest[1].uniques = true;
	return this.removeDuplicates(...rest).uniques;
};

module.exports.groupBy = (arr, options = {}) => {
	const converter = getConverter(options);
	const result = {};

	for (const value of arr) {
		const key = converter(value);
		if (!result[key]) result[key] = [];
		result[key].push(value);
	}

	return result;
};
