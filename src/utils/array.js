module.exports.sort = (arr, options = {}) => {
	const multiplier = options.isReverse ? -1 : 1;
	const field = options.field;
	const convert = options.convert ?? ((v) => v);
	const numeric = options.numeric ?? false;
	const compare =
		options.compare ?? new Intl.Collator(undefined, { sensitivity: 'base', numeric }).compare;

	const result = arr.toSorted((a, b) => {
		const valueA = convert(field ? a[field] : a);
		const valueB = convert(field ? b[field] : b);

		return multiplier * compare(valueA, valueB);
	});

	return result;
};

module.exports.removeDuplicates = (arr, options = {}) => {
	const isObject = !!options.field;

	const field = options.field;
	const seen = {};
	const uniqueArray = arr.filter((v) => {
		const value = isObject ? v[field] : v;
		if (Object.prototype.hasOwnProperty.call(seen, value)) return false;
		if (!value && value !== 0) return false;

		seen[value] = value;
		return true;
	});

	if (options.returnUnique) return Object.values(seen);

	return uniqueArray;
};
