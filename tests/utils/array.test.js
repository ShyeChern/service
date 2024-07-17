const { array } = require('../../src/utils');

describe('utils/array', () => {
	describe('sort', () => {
		const arrayOfNumber = [4, 11.1, 11, 11.6, 30, 1, 22, 55, 33, 31];
		const arrayOfObjects = [
			{ string: 'apple', number: 3 },
			{ string: 'Banana', number: 2 },
			{ string: 'Coconut', number: 1 },
			{ string: 'coconut', number: 5 },
			{ string: 'Apple', number: 4 },
		];

		test('should able to sort numeric and string value', () => {
			const sortedNumeric = array.sort(arrayOfNumber, { numeric: true });
			const expectedNumeric = arrayOfNumber.toSorted((a, b) => a - b);
			const sortedString = array.sort(arrayOfNumber);
			const expectedString = arrayOfNumber.toSorted();
			expect(sortedNumeric.toString()).toBe(expectedNumeric.toString());
			expect(sortedString.toString()).toBe(expectedString.toString());
		});

		test('should able to sort array of object', () => {
			const sortedArrayOfObjects = array.sort(arrayOfObjects, { field: 'number', numeric: true });
			expect(sortedArrayOfObjects[0].number).toBe(1);
			expect(sortedArrayOfObjects[sortedArrayOfObjects.length - 1].number).toBe(5);
		});

		test('should able to sort array in ascending and decending', () => {
			const sortedArrayAscending = array.sort(arrayOfObjects, {
				field: 'number',
				numeric: true,
				isReverse: false,
			});
			const sortedArrayDescending = array.sort(arrayOfObjects, {
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
			const sortedArrayNumber = array.sort([6, 10, 2, 1.5, 1.2, 1.3, 1, 100.1, 100.5, 100.3, 10], {
				convert: parseInt,
				numeric: true,
			});
			expect(sortedArrayNumber[0]).toBe(1.5);
			expect(sortedArrayNumber[sortedArrayNumber.length - 1]).toBe(100.3);
		});

		test('should able to sort array by providing custom compare function', () => {
			const sortedArrayStringLength = array.sort(arrayOfObjects, {
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
