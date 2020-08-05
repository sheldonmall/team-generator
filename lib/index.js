var inquirer = require("inquirer");
var fs = require("fs");

var questionArr1 = [
  {
    type: "input",
    message: "Enter Project Title: ",
    name: "title",
  },
  {
    type: "input",
    message: "Provide a brief Description of your Project: ",
    name: "description",
  },
  {
    type: "input",
    message: "Enter Installation instructions: ",
    name: "installation",
  },
  {
    type: "input",
    message: "Enter Usage instructions: ",
    name: "usage",
  },
  {
    type: "input",
    message: "Enter Credits information to acknowledge collaborators: ",
    name: "credits",
  },
  {
    type: "input",
    message: "Enter License information: ",
    name: "license",
  },
  {
    type: "input",
    message: "Enter guidelines for Contributing to your Project: ",
    name: "contributing",
  },
  {
    type: "input",
    message: "Enter information about how to Test your aplication: ",
    name: "testing",
  },
  {
    type: "input",
    message:
      "Provide contact information how users can reach you for any Questions: ",
    name: "questions",
  },
];

var myFilename = "newREADME.md";

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) throw err;
  });
}

// function to initialize program
function init() {
  inquirer.prompt(questionArr1).then(function (response) {
    writeToFile(myFilename, generateMarkdown(response));
  });
}

// function call to initialize program
init();
