const db = require("../config/connection");

const selectAllDepartments = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM department;", (error, departments) => {
      if (error) {
        return reject(error);
      }
      console.log(departments);
    });
  });
};

const selectAllRoles = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM role;", (error, roles) => {
      if (error) {
        return reject(error);
      }
      console.log(roles);
    });
  });
};

const selectAllEmployees = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM employee;", (error, employees) => {
      if (error) {
        return reject(error);
      }
      console.log(employees);
    });
  });
};

module.exports = { selectAllDepartments, selectAllRoles, selectAllEmployees };
