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
      if (!departmentName) {
        console.log("Try Again. All Fields must be filled.\n");
        return addDepartment();
      } else {
        let sql = `INSERT IGNORE INTO department(name)
        VALUES(?)`;

        let newDepartment = departmentName;

        db.query(sql, newDepartment, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("New department has been added to the database!");
        });
      }
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
        message: "Enter the department id of the new role to be added.",
      },
    ])
    .then(({ roleTitle, roleSalary, roleDepartment }) => {
      if (!roleTitle || !roleSalary || !roleDepartment) {
        console.log("Try Again. All Fields must be filled.\n");
        return addRole();
      } else {
        let sql = `INSERT INTO role(title, salary, department_id)
        VALUES(?)`;

        let newRole = [roleTitle, Number(roleSalary), Number(roleDepartment)];

        db.query(sql, [newRole], (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("New role has been added to the database!", result);
        });
      }
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
        message: "Enter the new employees role id.",
      },
      {
        type: "input",
        name: "manager",
        message: "If applicable, enter manager id for the new employee.",
      },
    ])
    .then(({ firstName, lastName, role, manager }) => {
      if (!firstName || !lastName || !role || !manager) {
        console.log("Try Again. All Fields must be filled.\n");
        return addEmployee();
      } else {
        let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES(?)`;

        let newEmployee = [firstName, lastName, Number(role), Number(manager)];

        db.query(sql, [newEmployee], (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("New employee has been added to the database!", result);
        });
      }
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeID",
        message: "Enter id of employee's new role.",
      },
      {
        type: "input",
        name: "newRole",
        message: "Enter employee id for which to apply new role.",
      },
    ])
    .then(({ employeeID, newRole }) => {
      if (!employeeID || !newRole) {
        console.log("Try Again. All Fields must be filled.\n");
        return updateEmployee();
      } else {
        let sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

        let newEmployeeRole = [Number(employeeID), Number(newRole)];

        db.query(sql, newEmployeeRole, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("An employee's role has been updated!", result);
        });
      }
    });
};

module.exports = { addDepartment, addRole, addEmployee, updateEmployee };
