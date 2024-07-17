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

module.exports.getUnique = () => {};
