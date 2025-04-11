DELETE FROM employees;
DELETE FROM roles;
DELETE FROM departments;

ALTER SEQUENCE departments_id_seq RESTART WITH 1;
ALTER SEQUENCE roles_id_seq RESTART WITH 1;
ALTER SEQUENCE employees_id_seq RESTART WITH 1;

INSERT INTO departments (name) VALUES
('Development'),
('Marketing'),
('Finance'),
('Operations');

INSERT INTO roles (title, salary, department_id) VALUES
('Senior Developer', 95000, 1),
('Marketing Specialist', 60000, 2),
('Accountant', 70000, 3),
('Operations Manager', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Wunderlund', 1, NULL),
('Bobby', 'Brownstone', 2, 1),
('Christopher', 'Kent', 3, NULL),
('Steven', 'Nicks', 4, 3);
