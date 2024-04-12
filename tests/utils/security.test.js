const { security } = require('../../src/utils');

describe('utils/security', () => {
	const payload = { id: 1, name: 'unit_test' };
	let token;
	let result = {};
	test('should generate token', () => {
		token = security.generateToken(payload);
		expect(typeof token).toBe('string');
	});

	test('should verify token', () => {
		result = security.verifyToken(token);
		expect(result.id).toBe(payload.id);
	});

	it('should have expire date', () => {
		result = security.verifyToken(token);
		expect(typeof (result.exp - result.iat)).toBe('number');
	});

	test('should accept expiresIn option', () => {
		const token = security.generateToken(payload, { expiresIn: '1d' });
		const result = security.verifyToken(token);
		expect(result.exp - result.iat).toBe(86400);
	});

	test('should accept refresh option', () => {
		const token = security.generateToken(payload, { refresh: true });
		const result = security.verifyToken(token, { refresh: true });
		expect(result.id).toBe(payload.id);
	});
});
