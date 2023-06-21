const inquirer = require('inquirer')
const db = require("./config/connection")
const showTable = require("./utility/table")

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role',
                'exit'
            ]
        },

    ])
        .then(answer => {


            if (answer.choice == 'view all departments') {
                viewAllDept()
            }
            if (answer.choice == "view all roles") {
                viewRoles();
            }
            if (answer.choice == "view all employees") {
                viewEmp();
            }

            if (answer.choice == "add a department") {
                addDept();
            }
            if (answer.choice == "add a role") {
                addRole();
            }
            if (answer.choice == "add an employee") {
                addEmp();
            }
            if (answer.choice == "update an employee role") {
                updateEmpRole();
            }
            if (answer.choice == "exit") {
                process.exit();
            }
        })
}


function viewAllDept() {
    db.query("SELECT * FROM department;", async function (err, data) {
        if (err) {
            console.log(err);
            return;
        } else {
            await showTable(data)
            mainMenu()
        }
    })
}


async function viewRoles() {
    const roleData = await db.promise().query("SELECT * FROM role;")
    await showTable(roleData[0]);
    mainMenu()
}

async function viewEmp() {
    const empData = await db.promise().query("SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN role r ON e.role_id = r.id JOIN department d ON d.id = r.department_id;")
    await showTable(empData[0]);
    mainMenu()
}


async function addDept() {
    const response = await inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "What is the name of this new department?"
        }
    ])

    const deptData = await db.promise().query("INSERT INTO department (name) VALUES (?)", [response.dept_name])
    mainMenu();
}


async function addRole() {

    const deptData = await db.promise().query("SELECT * FROM department")
    const deptChoices = deptData[0].map(({ id, name }) => ({ name: name, value: id }))
    const response = await inquirer.prompt([
        {
            type: "input",
            name: "role_name",
            message: "What is the name of the role?"
        },
        {
            type: "input",
            name: "role_salary",
            message: "What is the salary of the role?"
        },
        {
            type: "list",
            name: "role_id",
            message: "Which department does the role belong to?",
            choices: deptChoices
        },


    ]);

    const newRole = await db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.role_name, response.role_salary, response.role_id])
    mainMenu();

}

async function addEmp() {

    const roleData = await db.promise().query("SELECT * FROM role")
    const roleChoices = roleData[0].map(({ title, id }) => ({ name: title, value: id }))
    const empData = await db.promise().query("SELECT * FROM employee")
    const empChoices = empData[0].map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }))
    const response = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleChoices
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: empChoices
        },

    ]);

    const newEmp = await db.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.first_name, response.last_name, response.role_id, response.manager_id])
    mainMenu();

}

async function updateEmpRole() {
    const empData = await db.promise().query("SELECT * FROM employee")
    const empChoices = empData[0].map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }))
    const roleData = await db.promise().query("SELECT * FROM role")
    const roleChoices = roleData[0].map(({ title, id }) => ({ name: title, value: id }))

    const response = await inquirer.prompt([
        {
            type: "list",
            name: "emp",
            message: "Which employee's role do you want to update?",
            choices: empChoices
        },
        {
            type: "list",
            name: "emp_role",
            message: "Which role do you want to assign to the selected employee?",
            choices: roleChoices

        }
    ])
    
    const updatedEmp = await db.promise().query("UPDATE employee SET role_id=? WHERE id=?", [response.emp_role, response.emp])
    mainMenu();

}


mainMenu();