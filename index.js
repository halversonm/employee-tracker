const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'department',
    },
  ])
  