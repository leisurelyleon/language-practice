-- Create a new database
CREATE DATABASE my_database;

-- Use the newly created database
USE my_database;

-- Create a table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data into the table
INSERT INTO users (username, email, password)
VALUES ('first_last', 'first@example.com', 'password123');

-- Select data from the table
SELECT * FROM users;

-- Update data in the table
UPDATE users
SET password = 'newpassword'
WHERE id = 1;

-- Delete data from the table
DELETE FROM users WHERE id = 1;

-- Drop the table
DROP TABLE users;

-- Drop the database
DROP DATABASE my_database;