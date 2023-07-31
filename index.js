const inquirer = require('inquirer');
const mysql = require('mysql2');
require("dotenv").config();


const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME 
})

db.connect(function(err) {
    if(err) throw err;
    console.log("MySQL connected")
    prompt()
})


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
