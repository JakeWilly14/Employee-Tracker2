const db = require("../config/connection");
const inquirer = require("inquirer");

const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter name of department to be added.",
      },
    ])
    .then(({ departmentName }) => {
      let sql = `INSERT INTO department(name)
    VALUES(?)`;

      let newDepartment = departmentName;

      db.query(sql, newDepartment, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log('New department has been added to the database!', result);
      });
    });
};

const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Enter title of role to be added.",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter a salary amount for the new role.",
      },
      {
        type: "input",
        name: "roleDepartment",
        message: "Enter the department name of the new role to be added.",
      },
    ])
    .then(({ roleTitle, roleSalary, roleDepartment }) => {
      let sql = `INSERT INTO role(title, salary, department_id)
      VALUES(?)`;

      let newRole = [roleTitle, roleSalary, roleDepartment];

      db.query(sql, [newRole], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log('New role has been added to the database!', result);
      });
    });
};

const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the employee you would like to add.",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the employee you would like to add.",
      },
      {
        type: "input",
        name: "role",
        message: "Enter the new employees role title.",
      },
      {
        type: "input",
        name: "manager",
        message:
          "If applicable, enter manager first and last name for the new employee.",
      },
    ])
    .then(({ firstName, lastName, role, manager }) => {
      let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
      VALUES(?)`;

      let newEmployee = [firstName, lastName, role, manager];

      db.query(sql, [newEmployee], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log('New employee has been added to the database!', result);
      });
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeID",
        message: "To change employee role, enter employee id."
      },
      {
        type: "input",
        name: "newRole",
        message: "Enter role id for the employees new role."
      }
    ])
    .then(({ employeeID, newRole }) => {

      let sql = `UPDATE employee SET role_id = ? WHERE role_id = ?`
      
      let employeeRole = employeeID;
      let newEmployeeRole = newRole;

      db.query(sql, employeeRole, newEmployeeRole, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log("An employee's role has been updated!", result);
      });
    });
};

module.exports = { addDepartment, addRole, addEmployee, updateEmployee };
