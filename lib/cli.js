const inquirer = require("inquirer");
const {
  selectAllDepartments,
  selectAllRoles,
  selectAllEmployees,
} = require("./viewDB");
const {
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
} = require("./updateDB");

const CLI = () => {
  inquirer
    .prompt([
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
    .then(async ({ index }) => {
      let userOption;

      switch (index) {
        case "View all departments.":
          userOption = await selectAllDepartments();
          console.table(userOption);
          break;

        case "View all roles.":
          userOption = await selectAllRoles();
          console.table(userOption);
          break;

        case "View all employees.":
          userOption = await selectAllEmployees();
          console.table(userOption);
          break;

        case "Add a department.":
          await addDepartment();
          userOption = await selectAllDepartments();
          console.table(userOption);
          break;

        case "Add a role.":
          await addRole();
          userOption = await selectAllRoles();
          console.table(userOption);
          break;

        case "Add an employee.":
          await addEmployee();
          userOption = await selectAllEmployees();
          console.table(userOption);
          break;

        case "Update an employee role.":
          await updateEmployee();
          userOption = await selectAllEmployees();
          console.table(userOption);
          break;
      }
      CLI();
    });
};

module.exports = CLI;
