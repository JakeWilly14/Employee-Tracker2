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
          console.log("New department has been added!");
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
          console.log("New role has been added to the database!");
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
          console.log("New employee has been added to the database!");
        });
      }
    });
};

const employeeChoiceList = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM employee;", (error, employees) => {
      if (error) {
        return reject(error);
      }
      return resolve(
        employees.map((emp) => `${emp.first_name} ${emp.last_name}`)
      );
    });
  });
};

const updateEmployee = async () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "employeeName",
        message: "Choose an employee to update.",
        choices: await employeeChoiceList(),
      },
      {
        type: "input",
        name: "roleID",
        message: "Enter id of employee's new role.",
      },
      {
        type: "list",
        name: "managerName",
        message: "Assign a manager.",
        choices: await employeeChoiceList(),
      },
    ])
    .then(({ roleID, managerName, employeeName }) => {
      if (!roleID || !managerName || !employeeName) {
        console.log("Try Again. All Fields must be filled.\n");
        return updateEmployee();
      } else {
        const managerNames = managerName.split(" ");
        db.query(
          `SELECT id FROM employee WHERE first_name = ? and last_name =?`,
          managerNames,
          (err, result) => {
            let managerID = result[0].id;
            console.log(result[0].id);
            const [employeeFirst, employeeLast] = employeeName.split(" ");
            let sql = `UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ? and last_name = ?`;
            let updateValue = [roleID, managerID, employeeFirst, employeeLast];

            db.query(sql, updateValue, (err, result) => {
              if (err) {
                console.log(err);
              }
              console.log("An employee's role has been updated!", result);
            });
          }
        );
      }
    });
};

module.exports = { addDepartment, addRole, addEmployee, updateEmployee };
