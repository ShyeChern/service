const { logger } = require('../../src/utils');

describe('utils/logger', () => {
	let spyFunc;
	const infoOne = 'unit test one';
	const infoTwo = 'unit test two';

	beforeAll(() => {
		spyFunc = jest.spyOn(console, 'info');
	});

	test('should generate console info', () => {
		logger.log(infoOne, infoTwo);
		expect(spyFunc).toHaveBeenCalled();
	});

	test('should generate correct info', () => {
		const [outputOne, outputTwo, outputThree] = spyFunc.mock.calls[0];
		expect(new Date(outputOne)).toBeInstanceOf(Date);
		expect(outputTwo).toBe(infoOne);
		expect(outputThree).toBe(infoTwo);
	});

	afterAll(() => {
		spyFunc.mockRestore();
	});
});
