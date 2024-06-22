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
		)
			continue;

		diff.old = { ...diff.old, [key]: prev };
		diff.new = { ...diff.new, [key]: after };
	}

	return diff;
};

module.exports.getUnique = () => {};
