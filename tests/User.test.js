const User = require('../src/User')
const testUser = new User('bob', 'letmein', 9);
// User tests here
describe('testing properties for the User class', () => { 
	// test username
	test('should have a username passed in as an argument', () => {
		expect(typeof testUser.username).toBe('string');
	});

	// test password
	test('should have a password passed in as an argument', () => {
		expect(typeof testUser.password).toBe('string');
	})

	// test age
	test('should have an age passed in as an argument', () => {
		expect(typeof testUser.age).toBe('number');
	})

 })
