const common = require('../../src/utils');

describe('utils/common', () => {
	describe('getDiff', () => {
		const oldValue = {
			string: 'string',
			number: 1,
			null: null,
			type: '123456',
			date: new Date(2023, 0, 1),
			array: [1, 2],
			object: { a: 1, b: 2 },
		};
		const newValue = {
			string: 'string',
			number: 2,
			boolean: false,
			type: 123456,
			date: new Date(2024, 0, 1),
			array: ['1', '2'],
			object: { a: 2, b: 1 },
		};
		const diff = common.getDiff(oldValue, newValue);

		test('should return difference of two object', () => {
			expect(Object.keys(diff.old).length).toBe(Object.keys(diff.old).length);
		});

		test('should compare both of the object keys', () => {
			expect(diff.old.boolean).toBe(oldValue.boolean);
			expect(diff.new.boolean).toBe(newValue.boolean);
		});

		test('should return difference value of two object', () => {
			expect(diff.old.number).toBe(oldValue.number);
			expect(diff.new.number).toBe(newValue.number);
		});

		test('should return difference type of two object', () => {
			expect(diff.old.type).toBe(oldValue.type);
			expect(diff.new.type).toBe(newValue.type);
		});

		test('should be able to compare date difference', () => {
			expect(diff.old.date).toBe(oldValue.date);
			expect(diff.new.date).toBe(newValue.date);
		});

		test('should be able to compare array', () => {
			expect(diff.old.array).toBe(oldValue.array);
			expect(diff.new.array).toBe(newValue.array);
		});

		test('should be able to compare object', () => {
			expect(diff.old.object).toBe(oldValue.object);
			expect(diff.new.object).toBe(newValue.object);
		});
	});

	describe('sort', () => {
		const array = [4, 11.1, 11, 11.6, 30, 1, 22, 55, 33, 31];
		const arrayOfObjects = [
			{ string: 'apple', number: 3 },
			{ string: 'Banana', number: 2 },
			{ string: 'Coconut', number: 1 },
			{ string: 'coconut', number: 5 },
			{ string: 'Apple', number: 4 },
		];

		test('should able to sort numeric and string value', () => {
			const sortedNumeric = common.sort(array, { numeric: true });
			const expectedNumeric = array.toSorted((a, b) => a - b);
			const sortedString = common.sort(array);
			const expectedString = array.toSorted();
			expect(sortedNumeric.toString()).toBe(expectedNumeric.toString());
			expect(sortedString.toString()).toBe(expectedString.toString());
		});

		test('should able to sort array of object', () => {
			const sortedArrayOfObjects = common.sort(arrayOfObjects, { field: 'number', numeric: true });
			expect(sortedArrayOfObjects[0].number).toBe(1);
			expect(sortedArrayOfObjects[sortedArrayOfObjects.length - 1].number).toBe(5);
		});

		test('should able to sort array in ascending and decending', () => {
			const sortedArrayAscending = common.sort(arrayOfObjects, {
				field: 'number',
				numeric: true,
				isReverse: false,
			});
			const sortedArrayDescending = common.sort(arrayOfObjects, {
				field: 'number',
				numeric: true,
				isReverse: true,
			});
			expect(sortedArrayAscending[0].number).toBe(1);
			expect(sortedArrayAscending[sortedArrayAscending.length - 1].number).toBe(5);
			expect(sortedArrayDescending[0].number).toBe(5);
			expect(sortedArrayDescending[sortedArrayDescending.length - 1].number).toBe(1);
		});

		test('should able to sort array by providing custom convert function', () => {
			const sortedArrayNumber = common.sort([6, 10, 2, 1.5, 1.2, 1.3, 1, 100.1, 100.5, 100.3, 10], {
				convert: parseInt,
				numeric: true,
			});
			expect(sortedArrayNumber[0]).toBe(1.5);
			expect(sortedArrayNumber[sortedArrayNumber.length - 1]).toBe(100.3);
		});

		test('should able to sort array by providing custom compare function', () => {
			const sortedArrayStringLength = common.sort(arrayOfObjects, {
				field: 'string',
				isReverse: true,
				compare: (a, b) => {
					return a.length
						.toString()
						.localeCompare(b.length.toString(), undefined, { sensitivity: 'base', numeric: true });
				},
			});

			expect(sortedArrayStringLength[0].string).toBe('Coconut');
			expect(sortedArrayStringLength[sortedArrayStringLength.length - 1].string).toBe('Apple');
		});
	});
});
