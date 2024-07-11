module.exports.getDiff = (oldValue, newValue) => {
	const diff = {
		old: {},
		new: {},
	};

	const keys = [...new Set([...Object.keys(oldValue), ...Object.keys(newValue)])];

	for (const key of keys) {
		const prev = oldValue[key];
		const after = newValue[key];

		if (prev === after) continue;

		if (
			typeof prev === 'object' &&
			typeof after === 'object' &&
			JSON.stringify(prev) === JSON.stringify(after)
		) {
			continue;
		}

		diff.old = { ...diff.old, [key]: prev };
		diff.new = { ...diff.new, [key]: after };
	}

	return diff;
};

module.exports.getUnique = () => {};

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
