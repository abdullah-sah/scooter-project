class Scooter{
  constructor(station, user) {
    this.station = station;
    this.user = user;
    this.serial = Math.floor(Math.random()* 1000 + 1);
    this.charge = Math.floor(Math.random()* 100 + 1);
    this.isBroken = false;
    this.docked = true;
  }

  rent() {
    if (this.isBroken) {
      console.log('Scooter is broken, please send a repair request.');
    } else if (this.charge <= 20) {
      console.log('Scooter low on battery, please charge.');
    } else {
      console.log('Enjoy the ride!');
    }
  }

  dock(station) {
    if (typeof station === 'undefined') {
      // Come back here and throw an error instead of console.log()
      console.log('Docking station required!');
    } else {
      this.station = station;
      this.docked = true;
      this.user = "";
    }
  }

  recharge() {
    this.charge = 100;
  }

  async requestRepair() {
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    console.log('The scooter has been repaired.');
    this.isBroken = false;
  }
}


module.exports = Scooter
