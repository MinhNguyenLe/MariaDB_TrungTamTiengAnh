CREATE DATABASE EnglishEducation

CREATE TABLE Users(
  id INT PRIMARY KEY,
  user_name VARCHAR(32),
  email VARCHAR(32),
  number_phone VARCHAR(16),
  password VARCHAR(32),
  sur_name VARCHAR(32),
  name VARCHAR(32),
  address VARCHAR(32),
  birth VARCHAR(32),

);

CREATE TABLE Students(
  id INT PRIMARY KEY,
  user_id INT,
);

CREATE TABLE Teachers(
  id INT PRIMARY KEY,
);

CREATE TABLE Managers(
  id INT PRIMARY KEY,
);

CREATE TABLE Courses(
  id INT PRIMARY KEY,
);

CREATE TABLE Classes(
  id INT PRIMARY KEY,
);

CREATE TABLE Reviews(
  id INT PRIMARY KEY,
);

CREATE TABLE Rooms(
  id INT PRIMARY KEY,
);

CREATE TABLE Notis(
  id INT PRIMARY KEY,
);

CREATE TABLE Classes(
  id INT PRIMARY KEY,
);

CREATE TABLE Comments(
  id INT PRIMARY KEY,
);

CREATE TABLE Homeworks(
  id INT PRIMARY KEY,
);

CREATE TABLE Events(
  id INT PRIMARY KEY,
);

CREATE TABLE Classes(
  id INT PRIMARY KEY,
);