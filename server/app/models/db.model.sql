-- DROP DATABASE IF EXISTS Alumni CASCADE;
-- CREATE DATABASE  alumni; 

-- Company table
DROP TABLE IF EXISTS Company CASCADE;
CREATE TABLE  company  (
   company_id  SERIAL PRIMARY KEY Unique,
   company_name  varchar(255),
   registration_number  varchar(255),
   email  varchar(255),
   phone_number  varchar(255),
   logo varchar(255)
);
-- Users table
DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE  users  (
   employee_number int PRIMARY KEY Unique,
   image varchar(255),
   name varchar(255),
   surname varchar(255),
   job_title varchar(255),
   email  varchar(255),
   phone_number  varchar(255),
   password  varchar(255),
   employement_status varchar(255),
   account_status boolean default true,
   user_type int,
   company_id  int,
   looking boolean default false,
   FOREIGN KEY (user_type) REFERENCES UserType(user_type_id),
   FOREIGN KEY (company_id)REFERENCES Company (company_id) 
);

-- -- -- UserType table
DROP TABLE IF EXISTS UserType CASCADE;
CREATE TABLE  userType  (
   user_type_id SERIAL PRIMARY KEY Unique,
   name  varchar(255)
);
-- -- -- UserType insert
INSERT INTO UserType (name)
VALUES ('admin');
INSERT INTO UserType (name)
VALUES ('alumni');


-- Portfolio table
DROP TABLE IF EXISTS Portfolio CASCADE;
CREATE TABLE  Portfolio  (
   id  SERIAL PRIMARY KEY Unique,
   summary  varchar(600),
   user_id int,
  FOREIGN KEY (user_id)REFERENCES Users (employee_number)
);

--choseen skills
DROP TABLE IF EXISTS mySkills CASCADE;
CREATE TABLE mySkills (
   id SERIAL PRIMARY KEY Unique,
   user_id int NOT Null,
   skill_id int NOT Null,
   skill_description varchar NOT NULL,
   Ratings float,
   FOREIGN KEY (user_id) REFERENCES Users (employee_number),
   FOREIGN KEY (skill_id) REFERENCES Skills (id)
);

--choseen expertise
DROP TABLE IF EXISTS myExpertise CASCADE;
CREATE TABLE myExpertise (
   id SERIAL PRIMARY KEY Unique,
   user_id int NOT Null,
   expertise_id int NOT Null,
   description varchar NOT NULL,
   FOREIGN KEY (user_id) REFERENCES Users (employee_number),
   FOREIGN KEY (expertise_id) REFERENCES Expertise(id)
);

-- -- -- Expertise table
DROP TABLE IF EXISTS Expertise CASCADE;
CREATE TABLE  Expertise  (
   id  SERIAL PRIMARY KEY Unique,
   description  varchar(255)
);

-- -- -- Skills table
DROP TABLE IF EXISTS Skills CASCADE;
CREATE TABLE  Skills  (
   id  SERIAL PRIMARY KEY Unique,
   description  varchar(255)
);

-- -- Notifications table
DROP TABLE IF EXISTS Notifications CASCADE;
CREATE TABLE  Notifications  (
   id  SERIAL PRIMARY KEY Unique,
   user_id  int,
   post_id  int,
   imageOld varchar(255),
   time_stamp  Timestamp,
   response boolean,
   user_time_stamp Timestamp,
   description  varchar(255),
   notification_type  varchar(50),
   deleted boolean default false,
   notifs_company_id  int,
       FOREIGN KEY (user_id)REFERENCES Users (employee_number),
       FOREIGN KEY (notifs_company_id)REFERENCES Company (company_id)
);

-- -- Notifications table
DROP TABLE IF EXISTS userNotifications CASCADE;
CREATE TABLE  userNotifications  (
   id  SERIAL PRIMARY KEY Unique,
   user_id  int,
   image varchar(255),
   response boolean,
   time_stamp  Timestamp,
   description  varchar(255),
   notification_type  varchar(50),
   deleted boolean default false,
   notifs_company_id  int,
       FOREIGN KEY (user_id)REFERENCES Users (employee_number),
       FOREIGN KEY (notifs_company_id)REFERENCES Company (company_id)
);

-- -- -- Projects table
DROP TABLE IF EXISTS Projects CASCADE;
CREATE TABLE Projects (
   id SERIAL PRIMARY KEY Unique,
   title varchar(255),
   description varchar(255),
   user_id int ,
   FOREIGN KEY (user_id) REFERENCES Users (employee_number)
);


DROP TABLE IF EXISTS Portfolio2 CASCADE;
create table Portfolio2 ( 
     id SERIAL PRIMARY key,
     user_id integer,
     summary varchar(255),
     skills varchar [],
     expertise varchar[],
     Projects varchar [],
      FOREIGN KEY (user_id) REFERENCES Users (employee_number)
);

-- Insert Skills
insert into skills (description)
	values ('C#');
   
	-- Insert expertise
	insert into expertise (description)
	values ('Problem solving');

