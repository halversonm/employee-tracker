INSERT INTO department(id, name)
VALUES (1, "Board"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Finance"),
       (5, "Legal");

INSERT INTO role(department_id, title, salary)
VALUES (1, "CEO", 1000000),
       (2, "Sales Lead", 100000),
       (2, "Salesperson", 80000),
       (3, "Lead Engineer", 150000),
       (3, "Software Engineer", 120000),
       (4, "Accountant Manager", 160000),
       (4, "Accountant", 125000),
       (5, "Legal Team Lead", 250000),
       (5, "Lawyer", 190000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tyler", "Brown", 1, null),
       ("Eric", "Bose", 2, 1),
       ("Bryan", "Chance", 3, 3),
       ("Alyssa", "Cam", 4, 1),
       ("Chris", "Jones", 5, 4), 
       ("Jason", "Smith", 6, 1),
       ("Tom", "Johnson", 7, 5),
       ("Mario", "Anderson", 8, 1),
       ("Nick", "Stevenson", 9, 6);