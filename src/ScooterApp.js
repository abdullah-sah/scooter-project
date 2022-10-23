const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  static scooterSessions = [];

  constructor() {
    this.stations =  {
      Manhattan: [],
      Brooklyn: [],
      Queens: [],
      Bronx: [],
      StatenIsland: []
    }

    this.registeredUsers = {};
    ScooterApp.scooterSessions.push(this);
  }

  register(user) {
    // destructuring user object
    const { username, password, age } = user;

    // keeping track of currentUsers in an array
    const currentUsers = Object.keys(this.registeredUsers);


    if (user.age < 18) {
      console.log('Too young to register!');
    } else if (currentUsers.includes(username)) {
      console.log('Already registered!');
    } else {
      // creating an object to store user information
      const obj = {
        password,     // equivalent to 'password': password,
        age,
        loggedIn: false,
        accountChange: 0
      };

      // setting key value pair of username and their information
      this.registeredUsers[username] = obj;
      console.log('User has been registered');
    }
  }

  logIn(username, password) {
    const currentUsers = Object.keys(this.registeredUsers);
    if (currentUsers.includes(username) && this.registeredUsers[username].password === password) {
      this.registeredUsers[username].loggedIn = true;
      console.log(`${username} has logged in successfully!`);
    } else {
      console.log('Username or password is incorrect.');
    }
  }

  addScooter(location, scooter) {
    scooter.station = location;
    this.stations[location].push(scooter);
  }

  removeScooter(scooterToRemove) {
    const serial = scooterToRemove.serial;
    let scooterThere = false;
    const keys = Object.keys(this.stations);

    // looping over each key in this.stations, then over each array corresponding to that key
    keys.forEach(key => {
      this.stations[key].forEach((value, index) => {
        if (value.serial === serial) {
          this.stations[key].splice(this.stations[key][index], 1);
          scooterThere = true;
        }
      });
    });
    (scooterThere) ? console.log(`Scooter ${serial} has been removed.`) : console.log(`Scooter ${serial} could not be found.`);
  }
}

module.exports = ScooterApp
