const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// remove below line after testing
// var generateMarkdown = require("./generateMarkdown");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamArray = [];

function getManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter Your Name: ",
        name: "employeeName",
      },
      {
        type: "input",
        message: "Enter Your ID: ",
        name: "employeeId",
      },
      {
        type: "input",
        message: "Enter Your Email: ",
        name: "employeeEmail",
      },
      {
        type: "input",
        message: "Enter Your Office Number: ",
        name: "officeNumber",
      },
    ])
    .then(function ({ employeeName, employeeId, employeeEmail, officeNumber }) {
      const manager = new Manager(
        employeeName,
        employeeId,
        employeeEmail,
        officeNumber
      );
      teamArray.push(manager);
      getEmployee();
    });
}

// function buildTeam() {
//   // Get the first team member
//   getEmployee();

//   // ask for more employees
//   checkForMoreEmployees();
// }

function checkForMoreEmployees() {
  inquirer
    .prompt([
      {
        message: "Do you want to enter more team members? ",
        type: "confirm",
        // choices: ["Yes", "No"],
        name: "moreEmployees",
      },
    ])
    .then(function ({ moreEmployees }) {
      if (moreEmployees) {
        console.log("True");
        getEmployee();
      } else {
        console.log("False");
        renderHtml();
      }
    });
}

function renderHtml() {
  const employeeHtml = render(teamArray);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, employeeHtml);
}

function getEmployee() {
  inquirer
    .prompt([
      {
        message: "Choose the Employee Type you want to enter: ",
        type: "list",
        choices: ["Engineer", "Intern"],
        name: "employeeType",
      },
    ])
    .then(function ({ employeeType }) {
      if (employeeType === "Engineer") {
        getEngineer();
      } else {
        getIntern();
      }
    });
}

function getEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter Name: ",
        name: "employeeName",
      },
      {
        type: "input",
        message: "Enter ID: ",
        name: "employeeId",
      },
      {
        type: "input",
        message: "Enter Email: ",
        name: "employeeEmail",
      },
      {
        message: "Enter GitHub Username: ",
        type: "text",
        name: "githubname",
      },
    ])
    .then(function ({ employeeName, employeeId, employeeEmail, githubname }) {
      const engineer = new Engineer(
        employeeName,
        employeeId,
        employeeEmail,
        githubname
      );
      teamArray.push(engineer);
      checkForMoreEmployees();
    });
}

function getIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter Name: ",
        name: "employeeName",
      },
      {
        type: "input",
        message: "Enter ID: ",
        name: "employeeId",
      },
      {
        type: "input",
        message: "Enter Email: ",
        name: "employeeEmail",
      },
      {
        message: "Enter School name: ",
        type: "text",
        name: "schoolName",
      },
    ])
    .then(function ({ employeeName, employeeId, employeeEmail, schoolName }) {
      const intern = new Intern(
        employeeName,
        employeeId,
        employeeEmail,
        schoolName
      );
      teamArray.push(intern);
      checkForMoreEmployees();
    });
}

// function to initialize program
function init() {
  getManager();
  console.log(teamArray);
}

// function call to initialize program
init();

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
