const Scooter = require('../src/Scooter');
const User = require('../src/User');
const scoot = new Scooter('Baltimore', 'bob');

//typeof scooter === object
describe('scooter properties', () => {
  test('should have property "station" of type string', () => {
    expect(typeof scoot.station).toBe('string');
  });

  test('should have property "user" of type string', () => {
    expect(typeof scoot.user).toBe('string');
  });

  test('should have property "serial" that is a random number between 1 and 1000', () => {
    expect(scoot.serial).toBeGreaterThanOrEqual(1);
    expect(scoot.serial).toBeLessThanOrEqual(1000);
  });

  test('should have property "charge" that is a random number between 1 and 100', () => {
    expect(scoot.charge).toBeGreaterThanOrEqual(1);
    expect(scoot.charge).toBeLessThanOrEqual(100);
  });

  test('should have property "isBroken" that is set to false', () => {
    expect(scoot.isBroken).toBe(false);
  });

  test('should have property "docked" that is set to true', () => {
    scoot.dock('Manhattan');
    expect(scoot.docked).toBe(true);
    expect(scoot.user).toBe("");
  });
});

//Method tests
describe('scooter methods', () => {
  // tests here!
  //rent method
  test('should log "Enjoy the ride!" to the console if isBroken is false and charge > 20', () => { 
    scoot.charge = 100;
    const value = jest.spyOn(console, 'log');
    scoot.rent();
    expect(value).toHaveBeenCalledWith('Enjoy the ride!');
   });
   
  test('should log "Scooter low on battery, please charge." to the console if charge is less than 20', () => {
    scoot.charge = 20;
    const value = jest.spyOn(console, 'log');
    scoot.rent();
    expect(value).toHaveBeenCalledWith('Scooter low on battery, please charge.');
  });

  test('should log "Scooter is broken, please send a repair request." to the console if isBroken is true', () => {
    scoot.isBroken = true;
    const value = jest.spyOn(console, 'log');
    scoot.rent();
    expect(value).toHaveBeenCalledWith('Scooter is broken, please send a repair request.');
  });
  
  //dock method

  test('should log "Docking station required!" if no argument is passed into the method', () => {
    const value = jest.spyOn(console, 'log');
    scoot.dock();
    expect(value).toHaveBeenCalledWith('Docking station required!');
  });

  test('should set docked to true and set user to an empty string when calling dock() and passing in a scooter', () => {
    scoot.dock(scoot);
    expect(scoot.docked).toBe(true);
    expect(scoot.user).toBe('');
  });


  //requestRepair method
  test('should log "The scooter has been repaired" to the console when the requestRepair() method is called', async () => {
    const value = jest.spyOn(console, 'log');
    await scoot.requestRepair();
    expect(scoot.isBroken).toBe(false);
    expect(value).toHaveBeenCalledWith('The scooter has been repaired.');
  });

  //charge method
  test('should set scooter charge to 100 when recharge() method is called', () => {

    scoot.recharge();
    expect(scoot.charge).toBe(100);
  });
})
