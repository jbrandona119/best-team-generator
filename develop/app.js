const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

async function init() {
  //array of starter questions
  const questions = [
    {
      type: "confirm",
      name: "createEmployee",
      message: "Would you like to create a new employee?",
      default: true,
    },
    {
      type: "list",
      name: "role",
      message: "What is the role of the employee?",
      choices: [
        {
          name: "Intern",
          checked: false,
        },
        {
          name: "Engineer",
          checked: false,
        },
        {
          name: "Manager",
          checked: false,
        },
      ],
    },
    {
      type: "confirm",
      name: "repeat",
      message: "Do you want to create another employee?",
      default: false,
    },
  ];
  const internQuestions = [
    {
      type: "input",
      name: "name",
      message: "Enter employee name",
    },
    {
      type: "input",
      name: "id",
      message: "Enter employee ID",
    },
    {
      type: "input",
      name: "school",
      message: "Enter the intern's school",
    },
  ];
  const engineerQuestions = [
    {
      type: "input",
      name: "name",
      message: "Enter employee name",
    },
    {
      type: "input",
      name: "id",
      message: "Enter employee ID",
    },
    {
      type: "input",
      name: "email",
      message: "Enter employee email",
    },
    {
      type: "input",
      name: "github",
      message: "Enter employee github",
    },
  ];
  const managerQuestions = [
    {
      type: "input",
      name: "name",
      message: "Enter employee name",
    },
    {
      type: "input",
      name: "id",
      message: "Enter employee ID",
    },
    {
      type: "input",
      name: "email",
      message: "Enter employee email",
    },
    {
      type: "input",
      name: "office",
      message: "Enter manager office number",
    },
  ];
  //empty array of employees
  const employees = [];
  var exit = true;
  //if creating an employee, you are prompted to input role
  do {
    //making variable to store value from question[0]
    const ask = await inquirer.prompt(questions[0]);
    const { createEmployee } = ask;
    if (createEmployee === true) {
      const type = await inquirer.prompt(questions[1]);
      const { role } = type;
      //if role is intern
      if (role === "Intern") {
        const internObj = await inquirer.prompt(internQuestions);
        const { name, id, email, school } = internObj;
        //make new  intern
        const newIntern = new Intern(name, id, email, school);
        //push to employees array
        employees.push(newIntern);
        //asking if need to make another employee
        const runAgain = await inquirer.prompt(questions[2]);
        const { repeat } = runAgain;

        exit = repeat;
      }
      //if role engineer, make engineer
      else if (role === "Engineer") {
        const engineerObj = await inquirer.prompt(engineerQuestions);
        const { name, id, email, github } = engineerObj;
        const newEngineer = new Engineer(name, id, email, github);
        //push to array
        employees.push(newEngineer);
        const runAgain = await inquirer.prompt(questions[2]);
        const { repeat } = runAgain;
        exit = repeat;
      }
      //if role manager, make manager
      else if (role === "Manager") {
        const managerObj = await inquirer.prompt(managerQuestions);
        const { name, id, email, office } = managerObj;
        const newManager = new Manager(name, id, email, office);
        //push to employee array
        employees.push(newManager);
        const runAgain = await inquirer.prompt(questions[2]);
        const { repeat } = runAgain;
        exit = repeat;
      }
      //if createEmployee is false
    } else if (createEmployee === false) {
      console.log(
        "Employee creation finished..." +
          "You have " +
          employees.length +
          " employees."
      );
      exit = false;
    }
  } while (exit === true);
  //create variable of html
  const teamHTML = await render(employees);
  fs.writeFile(outputPath, teamHTML, function (err) {
    if (err) {
      return console.log("Something went wrong!");
    }
    console.log("Success!");
  });
}
init();
