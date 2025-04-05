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
('charlie', 'hashed_password3', 'Regular User'),
('dave', 'hashed_password4', 'Admin');

INSERT INTO task_areas (area_id, area_name) VALUES
(1, 'Postgres'),
(2, 'Cassandra'),
(3, 'Neo4j'),
(4, 'MongoDB');

INSERT INTO task_statements (statement_id, statement_text, area_id, solution_query, topic, subtasknumber, maxtime, hint, tasknumber) VALUES
(1, 'List of people with their department.', 1, 'SELECT * FROM email.person;', 'Equi Join', 1, 30, 'Use SELECT statement', 1),
(2, 'Number of emails sent out per department', 1, 'SELECT * FROM email.person;', 'Equi Join', 2, 30, 'Use WHERE clause', 1),
(3, 'Number of emails received per department', 1, 'SELECT * FROM email.person;', 'Equi Join', 3, 30, 'Use JOIN keyword', 1),
(4, 'Correlation between salary and number of emails', 1, 'SELECT * FROM email.person;', 'Theta Join', 1, 120, 'Use GROUP BY and ORDER BY', 2),
(5, 'List of people with their department.', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 1, 30, 'Use SELECT statement', 1),
(6, 'Number of emails sent out per department', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Equi Join', 2, 30, 'Use WHERE clause', 1),
(7, 'Number of emails received per department', 2, 'SELECT * FROM email.person;', 'Equi Join', 3, 30, 'Use JOIN keyword', 1),
(8, 'Correlation between salary and number of emails', 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', 'Theta Join', 1, 120, 'Use GROUP BY and ORDER BY', 2);

INSERT INTO user_task_data (username, statement_id, task_area_id, query_text, is_executable, result_size, is_correct, partial_solution, difficulty_level, processing_time) VALUES
('alice', 1, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Easy', 20),
('alice', 2, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Medium', 15),
('alice', 3, 1, 'SELECT * FROM email.person;', true, 100, true, NULL, 'Easy', 25),
('alice', 4, 1, 'SELECT * FROM email.person;', true, 50, true, NULL, 'Very Difficult', 110),
('alice', 5, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 50, true, NULL, 'Medium', 21),
('alice', 6, 2, 'SELECT department_name, person_firstname, person_lastname FROM enron.perdep;', true, 100, true, NULL, 'Easy', 29);

