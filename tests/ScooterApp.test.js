const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// example instances of ScooterApp, User & Scooter classes respectively
let testApp, testUser, scoot, value;

beforeEach(() => {
	testApp = new ScooterApp();
	testUser = new User('bob', 'letmein', 19);
	scoot = new Scooter('Manhattan', testUser);
	value = jest.spyOn(console, 'log');
});

afterEach(() => {
	// clearing the console log history after each test to avoid output leaking to other tests
	value.mockImplementation().mockClear();
})



// ScooterApp tests here
describe('register method tests', () => {
	
	// register user
	test('should log "Too young to register!" if the user is under the age of 18', () => {
		testUser.age = 9;
		testApp.register(testUser);
		expect(value).toHaveBeenCalledWith('Too young to register!');
		testUser.age = 19;		// resetting testUser's age
	});
	
	test('should log "Already registered!" if the user already has an account', () => {
		testApp.register(testUser);
		testApp.register(testUser);
		expect(value).toHaveBeenCalledWith('Already registered!');
	});
	
	test('should add user to registeredUsers object', () => {
		testApp.register(testUser);
		const currentUsers = Object.keys(testApp.registeredUsers);
		expect(currentUsers.includes(testUser.username)).toBe(true);
	});
	
	test('user key in registeredUsers object should have value of object with user\'s information (password, age)', () => {
		const { username, password, age } = testUser;
		testApp.register(testUser);
		const userInfo = testApp.registeredUsers[username];
		expect(userInfo.password).toBe(password);
		expect(userInfo.age).toBe(age);
	});
	
	test('user key in registeredUsers object should have value of object with keys of loggedIn: false and accountChange: 0', () => {
		const { username, password, age } = testUser;
		testApp.register(testUser);
		const userInfo = testApp.registeredUsers[username];
		expect(userInfo.loggedIn).toBe(false);
		expect(userInfo.accountChange).toBe(0);
	});
	
	test('should log "User has been registered" to the console', () => {
		testApp.register(testUser);
		expect(value).toHaveBeenCalledWith('User has been registered');
	});
});

// log in

describe('logIn method tests', () => {
	test('should log "bob has logged in successfully!" and change loggedIn to true if username and password match and are in registeredUsers', () => {
		testApp.register(testUser);
		testApp.logIn(testUser.username, testUser.password);
		expect(value).toHaveBeenCalledWith('bob has logged in successfully!');
		expect(testApp.registeredUsers[testUser.username].loggedIn).toBe(true);
	});
});

describe('addScooter method tests', () => {
	// add scooter
	test('should set scooter\'s station property to the location argument', () => { 
		testApp.addScooter('Bronx', scoot);
		expect(scoot.station).toBe('Bronx');
	});
	
});
test('should add scooter to scooter apps stations object', () => { 
	testApp.addScooter('Bronx', scoot);
	expect(testApp.stations['Bronx']).toContain(scoot);
});	

describe('removeScooter method tests', () => {
	// remove scooter
	test('should remove scooter if found at station and log to console "Scooter x has been removed."', () => {
		testApp.addScooter(scoot.station, scoot);
		value = jest.spyOn(console, 'log');
		testApp.removeScooter(scoot);
		expect(value).toHaveBeenCalledWith(`Scooter ${scoot.serial} has been removed.`);
	});

	test('should log "Scooter x could not found." to console if serial cannot be matched in stations', () => {
		testApp.removeScooter(scoot);
		expect(value).toHaveBeenCalledWith(`Scooter ${scoot.serial} could not be found.`);
	})
});