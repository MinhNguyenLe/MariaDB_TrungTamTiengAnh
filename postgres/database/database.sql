CREATE DATABASE EnglishEducation

CREATE TABLE feed_post(
  id INT,
  body VARCHAR(50),
  createAt date
);

CREATE TABLE feed_post1(
  id INT,
  body VARCHAR(50),
  createAt date
);


CREATE TABLE Users(
  user_id INT PRIMARY KEY,
  user_name VARCHAR(32),
  password VARCHAR(32),
  number_phone VARCHAR(16),
  email VARCHAR(32),
  sur_name VARCHAR(32),
  name VARCHAR(32),
  -- date_of_birth DATE(),
  place_of_birth VARCHAR(100),
  gender VARCHAR(10),
  ethenic_type VARCHAR(32),
  address VARCHAR(32),
  role_id INT,

  CONSTRAINT fk_user_id_role
  FOREIGN KEY (role_id)
  REFERENCES Role (role_id)

);

CREATE TABLE Roles(
  role_id INT PRIMARY KEY,
  role_name VARCHAR(32),
  permission_id VARCHAR(32),

  CONSTRAINT fk_rl_id_permission
  FOREIGN KEY (permission_id)
  REFERENCES Permissions (permission_id)
);

CREATE TABLE Permissions(
  permission_id INT PRIMARY KEY,
  permission_name VARCHAR(32),
  acctive VARCHAR(32),
);


CREATE TABLE StudentExams(
  student_exam_id INT PRIMARY KEY,
  paid bit NOT NULL DEFAULT (0),
  user_id INT,


  CONSTRAINT fk_stdex_id_user
  FOREIGN KEY (user_id)
  REFERENCES Users (user_id)
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