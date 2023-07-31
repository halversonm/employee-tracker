const inquirer = require('inquirer');
const mysql = require('mysql2');

const prompt = () => {
    inquirer
        .prompt([
            {
                name: 'menu',
                type: 'list',
                message: 'What would you like to do?',
                choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
            }
        ]).then((res) => {
            switch (res.menu) {
                case "View All Departments":
                    viewAllDepartments()
                    break;
                case "View All Roles":
                    viewAllRoles()
                    break;
                case "View All Employees":
                    viewAllEmployees()
                    break;
            }
        })
}

const viewAllDepartments = () => {
    console.log("test")
    prompt()
}

const viewAllRoles = () => {
    console.log("test")
    prompt()
}

const viewAllEmployees = () => {
    console.log("test")
    prompt()
}

prompt()
