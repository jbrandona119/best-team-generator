// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    this.role = "Manager";
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
}
//test
const sherry = new Manager("sherry", 10, "sherry@test.com", 333);
console.log(sherry);
sherry.getOfficeNumber();
sherry.getRole();


module.exports = Manager;
