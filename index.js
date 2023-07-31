const inquirer = require('inquirer');
const mysql = require('mysql2');

inquirer
  .prompt([
    {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
    },
  ])
  