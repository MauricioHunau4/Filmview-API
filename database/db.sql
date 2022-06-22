CREATE DATABASE filmdb

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    movie VARCHAR(255),
    person VARCHAR(255),
    rate VARCHAR(2),
    review VARCHAR(255) 
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    passwords VARCHAR(255)
);

