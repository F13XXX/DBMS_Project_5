CREATE DATABASE user_task;

CREATE TABLE users (
    user_name VARCHAR(10) UNIQUE PRIMARY KEY,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE task_areas (
    area_id INT PRIMARY KEY,
    area_name VARCHAR(255) NOT NULL
);

CREATE TABLE task_statements (
    statement_id SERIAL PRIMARY KEY,
    statement_text TEXT NOT NULL,
    area_id INT REFERENCES task_areas(area_id) ON DELETE CASCADE,
    solution_query TEXT NOT NULL,
    topic VARCHAR(255),
    subtasknumber INT,
    maxtime INT,
    hint TEXT,
    tasknumber INT
);

CREATE TABLE user_task_data (
    data_id SERIAL PRIMARY KEY,
    username VARCHAR(10) REFERENCES users(user_name) ON DELETE CASCADE,
    statement_id INT REFERENCES task_statements(statement_id) ON DELETE CASCADE,
    task_area_id INT REFERENCES task_areas(area_id) ON DELETE CASCADE,
    query_text TEXT,
    is_executable BOOLEAN,
    result_size INT,
    is_correct BOOLEAN,
    partial_solution TEXT,
    difficulty_level VARCHAR(50),
    processing_time INT
);

INSERT INTO users (user_name, password, role) VALUES
('alice', 'hashed_password1', 'Regular User'),
('bob', 'hashed_password2', 'Regular User'),
('dave', 'hashed_password4', 'Admin');

INSERT INTO task_areas (area_id, area_name) VALUES
(1, 'Postgres'),
(2, 'Cassandra'),
(3, 'Neo4j'),
(4, 'MongoDB');

INSERT INTO task_statements (statement_id, statement_text, area_id, solution_query, topic, subtasknumber, maxtime, hint, tasknumber) VALUES

-- Postgres Tasks
(1, 'For each person you want to know in which department she or he works. Therefore, you have to make
an output that contains a person’s first name and last name and the name of the department she or he is
working at.', 1, 'SELECT * FROM email.person;', 'Equi Join', 1, 30, '', 1),
(2, 'For each department: Find out how many emails in total were sent out from employees working there.
The output per department shall contain the corresponding number of emails.', 1, 'SELECT * FROM email.person;', 'Equi Join', 2, 30, 'Use WHERE clause', 1),
(3, 'For each department: Find out how many emails in total were sent to employees working there (hint:
carbon copies included). The output shall have the same structure as the output of Task 1.2.', 1, 'SELECT * FROM email.person;', 'Equi Join', 3, 30, '', 1),
(4, 'Do people that earn more than the average salary in their department write more emails than those who
don’t? Query for people that earn more than the average salary at their department and find out whether they
write more emails than the other employees that earn less than the average salary at their department
(equal is not considered). Check that for each department. First compute the result for the average
salary (avg. S.) per department that contains the brief-name of all the departments and the average
salary for that department. Then produce the output of all the people that earn more than the avg.
Salary and accordingly produce the output for all the people who earn less than the avg. Salary.
Produce a query result per department that contains the number of emails written by the people earning
more and the people earning less than the average.', 1, 'SELECT * FROM email.person;', 'Theta Join', 1, 120, '', 2),
(5, 'You have to introduce a new element (attribute) to the email’s entity set (to your own copy of email
table you created in task 3.1). Find the general syntax to do that Remember: Delete the tables that you
have created.', 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Schema Evolution', 1, 6, 'First create a copy of email table (in the “public” schema) and name it with “email_yourname” (e.g.
email_elmamooz) and execute the queries of task 3 (3.1, 3.2) on this new table. Add/delete data and
attributes just in your own copy of email table.', 3),
(6, 'Now, use the syntax from task 3.2 and add a new element “priority” to the email’s entity set with a
default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its
priority to a value of 3. Remember : Drop the table you created in task 3.1.', 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Schema Evolution', 2, 24, '', 3),
(7, 'Now, use the syntax from task 3.2 and add a new element “priority” to the email’s entity set with a
default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its
priority to a value of 3. Remember : Drop the table you created in task 3.1.', 1, 'SELECT * FROM email.person;', 'Missing Values', 1, 30, '', 4),
(8, 'Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out
which date and time format is used in email!', 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Range queries', 1, 12, '', 5),
(9, 'Richard Shapiro is an employee of Enron. Find all emails he received between the 01.09.2001 and the
31.10.2001', 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Range queries', 2, 60, '', 5),
(10, 'If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in
Enron from Larry May by email? Consider the “from” and “to” fields to compute the amount of hops that
is needed to reach everyone in Enron.', 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Network Analysis', 1, 120, 'you can use a UDF (User defined function) to solve the following two tasks.', 6),
(11, 'How many hops are needed to reach everyone from Larry May by their “knows" relationship (similar to
task 6.1)?', 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Network Analysis', 2, 30, '', 6),
(12, 'Which people are in the 2-hop email network? Again, consider the “knows” relationship, but only for
people that are reachable with two hops', 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Network Analysis', 3, 60, '', 6),
(13, 'Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).', 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Network Analysis', 4, 60, '', 6),

-- Cassandra Tasks
(14, 'For each person you want to know in which department she or he works. The output should contain a
person’s first name and last name and the name of the department she or he is working at.', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 1, 30, '', 1),
(15, 'For each department: Find out how many emails in total were sent out from employees working there.
The output per department (name) shall contain the corresponding number of emails.', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 2, 60, '', 1),
(16, 'For each department: Find out how many emails in total were sent to employees working there (hint:
carbon copies included). The output shall have the same structure as the output of Task 1.2.', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 3, 60, '', 1),
(17, 'Do people that earn more than the average salary in their department write more emails than those who
don’t?
Query for people that earn more than the average salary at their department and find out whether they
write more emails than the other employees that earn less than the average salary at their department
(equal is not considered). Check that for each department. First compute the result for the average salary
(avg. S.) per department that contains the brief-name of all the departments and the average salary for
that department. Then produce the output of all the people that earn more than the avg. Salary and
accordingly produce the output for all the people who earn less than the avg. Salary.
Produce a query result per department that contains the number of emails written by the people earning
more and the people earning less than the average.', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Theta Join', 1, 120, '', 2),
(18, 'You have to introduce a new element (attribute) to the department’s entity set (to your own copy of
department table you created). Find the general syntax to do that.', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Schema Evolution', 1, 30, 'First create a copy of the department table (in the “public” schema) and name it with
“department_yourname” (e.g. department_dude) and execute the queries of task 3 (3.1, 3.2) on this
new table. Add/delete data and attributes just in your own copy of the table. Use the export/import
from the Cassandra web tool to download/upload data.', 3),
(19, 'Now, use the syntax from task 3.1 and add a new column “num_employees” to the department table.
Then take a single department of your choice and find the number of employees working for this
department and insert this value.', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Schema Evolution', 2, 60, '', 3),
(20, 'Find missing values for each attribute of the e-mails.', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Missing values', 1, 30, '', 4),
(21, 'Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out
which date and time format is used in email!', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Range queries', 1, 30, '', 5),
(22, 'Richard Shapiro is an employee of Enron. Find all emails he received between the 01.09.2001 and the
31.10.2001', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Range queries', 2, 30, '', 5),


-- Neo4j Tasks
(23, 'For each person you want to know in which department she or he works. The output should contain a
person’s first name and last name and the name of the department she or he is working at.', 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 1, 60, '', 1),
(24, 'For each department: Find out how many emails in total were sent out from employees working there.
The output per department (name) shall contain the corresponding number of emails.', 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 2, 30, '', 1),
(25, 'For each department: Find out how many emails in total were sent to employees working there (hint:
carbon copies included). The output shall have the same structure as the output of Task 1.2.', 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 3, 30, '', 1),
(26, 'Do people that earn more than the average salary in their department write more emails than those who
don’t?
Query for people that earn more than the average salary at their department and find out whether they
write more emails than the other employees that earn less than the average salary at their department
(equal is not considered). Check that for each department. First compute the result for the average salary
(avg. S.) per department that contains the brief-name of all the departments and the average salary for
that department. Then produce the output of all the people that earn more than the avg. Salary and
accordingly produce the output for all the people who earn less than the avg. Salary.
Produce a query result per department that contains the number of emails written by the people earning
more and the people earning less than the average.', 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Theta Join', 1, 120, '', 2),
(27, 'You have to introduce a new element (attribute) to the department’s entity set (to your own copy of
department table you created). Find the general syntax to do that.', 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Schema Evolution', 1, 6, 'First create a copy of the department table (in the “public” schema) and name it with
“department_yourname” (e.g. department_dude) and execute the queries of task 3 (3.1, 3.2) on this
new table. Add/delete data and attributes just in your own copy of the table. Use the export/import
from the Cassandra web tool to download/upload data.', 3),
(28, 'Now, use the syntax from task 3.1 and add a new column “num_employees” to the department table.
Then take a single department of your choice and find the number of employees working for this
department and insert this value.', 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Schema Evolution', 2, 24, '', 3),
(29, 'Find missing values for each attribute of the e-mails.', 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Missing values', 1, 60, '', 4),
(30, 'Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out
which date and time format is used in email!', 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Range queries', 1, 30, '', 5),
(31, 'Richard Shapiro is an employee of Enron. Find all emails he received between the 01.09.2001 and the
31.10.2001', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Range queries', 2, 12, '', 5),


-- MongoDB Tasks
(32, 'For each person you want to know in which department she or he works. The output should contain a
person’s first name and last name and the name of the department she or he is working at.', 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 1, 60, '', 1),
(33, 'For each department: Find out how many emails in total were sent out from employees working there.
The output per department (name) shall contain the corresponding number of emails.', 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 2, 30, '', 1),
(34, 'For each department: Find out how many emails in total were sent to employees working there (hint:
carbon copies included). The output shall have the same structure as the output of Task 1.2.', 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 3, 30, '', 1),
(35, 'Do people that earn more than the average salary in their department write more emails than those who
don’t?
Query for people that earn more than the average salary at their department and find out whether they
write more emails than the other employees that earn less than the average salary at their department
(equal is not considered). Check that for each department. First compute the result for the average salary
(avg. S.) per department that contains the brief-name of all the departments and the average salary for
that department. Then produce the output of all the people that earn more than the avg. Salary and
accordingly produce the output for all the people who earn less than the avg. Salary.
Produce a query result per department that contains the number of emails written by the people earning
more and the people earning less than the average.', 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Theta Join', 1, 120, '', 2),
(36, 'You have to introduce a new element (attribute) to the department’s entity set (to your own copy of
department table you created). Find the general syntax to do that.', 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Schema Evolution', 1, 6, 'First create a copy of the department table (in the “public” schema) and name it with
“department_yourname” (e.g. department_dude) and execute the queries of task 3 (3.1, 3.2) on this
new table. Add/delete data and attributes just in your own copy of the table. Use the export/import
from the Cassandra web tool to download/upload data.', 3),
(37, 'Now, use the syntax from task 3.1 and add a new column “num_employees” to the department table.
Then take a single department of your choice and find the number of employees working for this
department and insert this value.', 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Schema Evolution', 2, 24, '', 3),
(38, 'Find missing values for each attribute of the e-mails.', 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Missing values', 1, 60, '', 4),
(39, 'Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out
which date and time format is used in email!', 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Range queries', 1, 30, '', 5),
(40, 'Richard Shapiro is an employee of Enron. Find all emails he received between the 01.09.2001 and the
31.10.2001', 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Range queries', 2, 12, '', 5);




INSERT INTO user_task_data (username, statement_id, task_area_id, query_text, is_executable, result_size, is_correct, partial_solution, difficulty_level, processing_time) VALUES
('alice', 1, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Easy', 20),
('alice', 2, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Normal', 15),
('alice', 3, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Very Easy', 25),
('alice', 4, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Very Difficult', 110),
('alice', 5, 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 21),
('alice', 6, 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 100, true, NULL, 'Easy', 29),
('alice', 7, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Easy', 20),
('alice', 8, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Normal', 15),
('alice', 9, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Very Easy', 25),
('alice', 10, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Very Difficult', 110),
('alice', 11, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Easy', 20),
('alice', 12, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Difficult', 20),
('alice', 13, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Very Difficult', 20),

('alice', 14, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 20),
('alice', 15, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 20),
('alice', 16, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Easy', 21),
('alice', 17, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 29),
('alice', 18, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 120),
('alice', 19, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Difficult', 21),
('alice', 20, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 21),
('alice', 21, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 42),
('alice', 22, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 32),

('alice', 23, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 20),
('alice', 24, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 15),
('alice', 25, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Easy', 21),
('alice', 26, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 23),
('alice', 27, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 110),
('alice', 28, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Difficult', 21),
('alice', 29, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 21),
('alice', 30, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 42),
('alice', 31, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 78),

('alice', 32, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 20),
('alice', 33, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 15),
('alice', 34, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Easy', 21),
('alice', 35, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 29),
('alice', 36, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 110),



('bob', 1, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Normal', 20),
('bob', 2, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Normal', 15),
('bob', 3, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Very Easy', 25),
('bob', 4, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Very Difficult', 110),
('bob', 5, 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Easy', 21),
('bob', 6, 1, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 100, true, NULL, 'Easy', 42),
('bob', 7, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Easy', 20),
('bob', 8, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Normal', 15),
('bob', 9, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Very Easy', 25),
('bob', 10, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Very Difficult', 110),
('bob', 11, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Easy', 20),
('bob', 12, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Easy', 42),
('bob', 13, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Very Difficult', 42),

('bob', 14, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 20),
('bob', 15, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 42),
('bob', 16, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Easy', 21),
('bob', 17, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 29),
('bob', 18, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 110),
('bob', 19, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Difficult', 21),
('bob', 20, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 21),
('bob', 21, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 42),
('bob', 22, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 21),

('bob', 23, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 20),
('bob', 24, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 15),
('bob', 25, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Easy', 21),
('bob', 26, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 29),
('bob', 27, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 110),
('bob', 28, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 42),
('bob', 29, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 21),
('bob', 30, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Difficult', 42),
('bob', 31, 3, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 42),

('bob', 32, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 42),
('bob', 33, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Easy', 15),
('bob', 34, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Very Easy', 42),
('bob', 35, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Easy', 12),
('bob', 36, 4, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Normal', 120);