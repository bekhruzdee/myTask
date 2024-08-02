CREATE DATABASE n9;

\c n9;

CREATE TABLE companies(
    id SERIAL PRIMARY KEY,
    name VARCHAR(99)
);

INSERT INTO companies(name) VALUES ('Apple');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    fullname TEXT NOT NULL,
    company_id INT REFERENCES companies(id),
    role VARCHAR(20) 
);

INSERT INTO users(login, password, fullname, company_id, role)
VALUES ('bekhruz', '1111', 'bekhruz aka', 1, 'admin');

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(100),
    company_id INT REFERENCES companies(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_tasks (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    task_id INT REFERENCES tasks(id),
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    status VARCHAR(100) NOT NULL
);