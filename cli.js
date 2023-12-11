const inquirer = require('inquirer');

const cli = inquirer
  .prompt([
    {
      type: 'list',
      name: 'index',
      message: "Please choose an option.",
      choices: [
        'View all departments.',
        'View al roles.',
        'View all employees.',
        'Add a department.',
        'Add a role.',
        'Add an employee.',
        'Update an employee role'
      ]
    }
  ])

  module.exports = cli;