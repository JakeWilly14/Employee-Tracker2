const inquirer = require("inquirer");
const { selectAllDepartments, selectAllRoles, selectAllEmployees } = require('./viewDB');
const { addDepartment, addRole, addEmployee, updateEmployee } = require('./updateDB')

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
          "Update an employee role.",
        ],
      },
    ])
    .then(({index}) => {
      let userOption;

      switch(index) {
        case 'View all departments.':
          userOption = selectAllDepartments()
        break;

        case 'View all roles.': 
          userOption = selectAllRoles()
        break;

        case 'View all employees.': 
          userOption = selectAllEmployees()
        break;

        case 'Add a department.': 
          userOption = addDepartment()
        break;

        case 'Add a role.': 
          userOption = addRole()
        break;

        case 'Add an employee.': 
          userOption = addEmployee()
        break;

        case 'Update an employee role.': 
          userOption = updateEmployee()
        break;
      }
    })
  }
}

module.exports = CLI;
