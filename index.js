const inquirer = require('inquirer');
const mysql = require('mysql2');
require("dotenv").config();


const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
})

db.connect(function (err) {
    if (err) throw err;
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
                case "Add Department":
                    addDepartment()
                    break;
                case "Add Role":
                    addRole()
                    break;
                case "Add Employee":
                    addEmployee()
                    break;
                case "Update Employee Role":
                    updateEmployeeRole()
                    break;
            }
        })
}

const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.table(res)
        prompt()
    })
}

const viewAllRoles = () => {
    db.query(`SELECT * FROM role`, function (err, res) {
        if (err) throw err;
        console.table(res)
        prompt()
    })
}

const viewAllEmployees = () => {
    db.query(`SELECT * FROM employee`, function (err, res) {
        if (err) throw err;
        console.table(res)
        prompt()
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What department would you like to add?",
        }
    ]).then((res) => {
        db.query(`INSERT INTO department SET ?`, {
            name: res.department
        })
        console.log(`${res.department} was added to department table!`)
        prompt()
    })
}

const addRole = () => {
    db.promise().query(`SELECT * FROM department`)
        .then(([data]) => {
            const departmentList = data.map(({ id, name }) => name
                // ({name: name, value: id})
            )
            console.log(departmentList)

            inquirer.prompt([
                {
                    type: "input",
                    name: "role-name",
                    message: "What is the name of the role?",
                },
                {
                    type: "input",
                    name: "role-salary",
                    message: "What is the salary of the role?",
                },
                {
                    type: "list",
                    name: "role-department",
                    message: "Which department does the role belong to?",
                    choices: departmentList
                },
            ]).then((res) => {
                console.log(res);
                db.query(`INSERT INTO role SET ?`, {
                    name: res.department
                })
                console.log(`${res.department} was added to role table!`)
                prompt()
            })
        });
}
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "employee-first",
            message: "What is the exmployee's first name?",
        },
        {
            type: "input",
            name: "employee-last",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "employee-role",
            message: "What is the employee's role?",
            choices: []
        },
        {
            type: "list",
            name: "employee-manager",
            message: "Who is the employee's manager?",
            choices: []
        },
    ]).then((res) => {
        db.query(`INSERT INTO role SET ?`, {
            name: res.department
        })
        console.log(`Added ${employee - first} ${employee - last} to the database`)
        prompt()
    })
    db.query(``, function (err, res) {
        if (err) throw err;
        console.table(res)
        prompt()
    })
}
const updateEmployeeRole = () => {
    db.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
            .then(empChoice => {
                const employee = empChoice.name;
                const params = [];
                params.push(employee);

                const roleSql = `SELECT * FROM roles`;

                db.query(roleSql, (err, data) => {
                    if (err) throw err;

                    const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: "What is the employee's new role?",
                            choices: roles
                        }
                    ])
                        .then(roleChoice => {
                            const role = roleChoice.role;
                            params.push(role);

                            let employee = params[0]
                            params[0] = role
                            params[1] = employee

                            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                            db.query(sql, params, (err, result) => {
                                if (err) throw err;
                                console.log("Employee has been updated!");

                                menu();
                            });
                        });
                });
            });
    });
}