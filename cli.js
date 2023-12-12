const inquirer = require("inquirer");
const { selectAllDepartments, selectAllRoles, selectAllEmployees } = require('./lib/viewDB');

class CLI {
  run() {
    inquirer.prompt([
      {
        type: "list",
        name: "index",
        message: "Please choose an option.",
        choices: [
          "View all departments.",
          "View all roles.",
          "View all employees.",
          "Add a department.",
          "Add a role.",
          "Add an employee.",
          "Update an employee role",
        ],
      },
    ])
    .then(({index}) => {
      let userOption;

      switch(index) {
        case 'View all departments.':
          userOption = selectAllDepartments()
        break;

        case 'View all roles': 
          userOption = selectAllRoles()
        break;

        case 'View all employees': 
          userOption = selectAllEmployees()
        break;
      }
    })
  }
}

module.exports = CLI;
