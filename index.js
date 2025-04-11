const inquirer = require("inquirer").default;
const db = require("./db/connection");



function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Employee",
          "Update Employee",
          "Remove Employee",
          "Add Department",
          "Add Role",
        "--------------------------------",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "View All Departments":
          return viewDepartments();
        case "View All Roles":
          return viewRoles();
        case "View All Employees":
          return viewEmployees();
        case "Add Employee":
          return addEmployee();
          case "Update Employee Role":
            return updateEmployeeRole();
        case "Remove Employee":
            return removeEmployee();
        case "Add Department":
            return addDepartment();
        case "Add Role":
            return addRole();
        default:
          db.end();
          console.log("👋 Goodbye!");
      }
    });
}

function viewDepartments() {
    db.query("SELECT * FROM departments", (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      mainMenu();
    });
  }
  
  function viewRoles() {
    db.query("SELECT * FROM roles", (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      mainMenu();
    });
  }
  
  function viewEmployees() {
    db.query("SELECT * FROM employees", (err, res) => {
      if (err) throw err;
      console.table(res.rows);
      mainMenu();
    });
  }

    function addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
            },
            {
                type: "input",
                name: "role_id",
                message: "What is the employee's role ID?",
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is the employee's manager ID?",
            },
        ]).then((answer) => {
            db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
                if (err) throw err;
                console.log(`Employee ${answer.first_name} ${answer.last_name} added successfully!`);
                mainMenu();
            });
        });
    }

    function updateEmployeeRole() {
        db.query("SELECT id, first_name, last_name FROM employees", (err, empRes) => {
          if (err) throw err;
      
          const employeeChoices = empRes.rows.map(emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id,
          }));
      
          db.query("SELECT id, title FROM roles", (err, roleRes) => {
            if (err) throw err;
      
            const roleChoices = roleRes.rows.map(role => ({
              name: role.title,
              value: role.id,
            }));
      
            inquirer.prompt([
              {
                type: "list",
                name: "employee_id",
                message: "Which employee's role would you like to update?",
                choices: employeeChoices,
              },
              {
                type: "list",
                name: "role_id",
                message: "Select the employee's new role:",
                choices: roleChoices,
              },
            ]).then((answers) => {
              const { employee_id, role_id } = answers;
      
              db.query(
                "UPDATE employees SET role_id = $1 WHERE id = $2",
                [role_id, employee_id],
                (err, res) => {
                  if (err) throw err;
                  console.log(`✅ Employee role updated successfully!`);
                  mainMenu();
                }
              );
            });
          });
        });
      }

      function removeEmployee() {
        db.query("SELECT id, first_name, last_name FROM employees", (err, res) => {
          if (err) throw err;
      
          const employeeChoices = res.rows.map(emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id,
          }));
      
          inquirer.prompt([
            {
              type: "list",
              name: "employee_id",
              message: "Select the employee to remove:",
              choices: employeeChoices,
            },
            {
              type: "confirm",
              name: "confirmDelete",
              message: "Are you sure you want to remove this employee?",
              default: false,
            },
          ]).then(({ employee_id, confirmDelete }) => {
            if (!confirmDelete) {
              console.log("❎ Cancelled. No employee was removed.");
              return mainMenu();
            }
      
            db.query("DELETE FROM employees WHERE id = $1", [employee_id], (err, res) => {
              if (err) throw err;
              console.log("🗑️ Employee removed successfully.");
              mainMenu();
            });
          });
        });
      }
      
    function addDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "department_name",
                message: "What is the name of the new department?",
            },
        ]).then((answer) => {
            db.query("INSERT INTO departments (name) VALUES ($1)", [answer.department_name], (err, res) => {
                if (err) throw err;
                console.log(`Department ${answer.name} added successfully!`);
                mainMenu();
            });
        });
    }

    function addRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "role_title",
                message: "What is the title of the new role?",
            },
            {
                type: "input",
                name: "role_salary",
                message: "What is the salary for this role?",
            },
            {
                type: "input",
                name: "department_id",
                message: "What is the department ID for this role?",
            },
        ]).then((answer) => {
            db.query("INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)", [answer.role_title, answer.role_salary, answer.department_id], (err, res) => {
                if (err) throw err;
                console.log(`Role ${answer.role_title} added successfully!`);
                mainMenu();
            });
        });
    }

  mainMenu();
  