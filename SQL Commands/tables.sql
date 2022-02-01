/* Connect to MYSQL */
/* mysql --host=127.0.0.1 */

CREATE DATABASE IF NOT EXISTS covid_tracker;
USE covid_tracker;

CREATE TABLE Users (
id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
address VARCHAR(50),
zip INT,
email VARCHAR(50) UNIQUE NOT NULL,
username VARCHAR (255) UNIQUE NOT NULL,
password VARCHAR(256),
DOB VARCHAR(30),
contact_number INT,
email_sub VARCHAR(10),
PRIMARY KEY (id)
);


CREATE TABLE Owners (
id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
address VARCHAR(50),
zip INT,
email VARCHAR(50) UNIQUE NOT NULL,
username VARCHAR (255) UNIQUE NOT NULL,
password VARCHAR(256),
DOB VARCHAR(30),
contact_number INT,
PRIMARY KEY (id),
);


CREATE TABLE Admins (
id INT AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
email VARCHAR(50),
password VARCHAR(256),
admin_username VARCHAR(255) UNIQUE NOT NULL,
PRIMARY KEY (id)
);


CREATE TABLE Business (
id INT AUTO_INCREMENT,
name VARCHAR(30),
venue_size INT,
capacity INT,
business_type VARCHAR(30),
business_number INT,
address VARCHAR(50),
zip INT,
business_code VARCHAR(30),
owner_id INT,
PRIMARY KEY (id),
FOREIGN KEY (owner_id) REFERENCES Owners(id)
);


CREATE TABLE UserCheckIn (
id INT AUTO_INCREMENT,
users_id INT,
date_time VARCHAR(30),
business_id INT,
PRIMARY KEY (id),
FOREIGN KEY (users_id) REFERENCES Users(id),
FOREIGN KEY (business_id) REFERENCES Business(id)
);


CREATE TABLE Hotspot (
hotspot_id INT AUTO_INCREMENT,
zip INT,
yes_col VARCHAR(50),
PRIMARY KEY (hotspot_id)
);

CREATE TABLE Restriction (
restrict_id INT AUTO_INCREMENT,
restrictions VARCHAR(10),
PRIMARY KEY (restrict_id)
);


/* Create a default User */
INSERT INTO Users VALUES (1,'Pie','Face','100 Food St', 5000, 'edbenchn@gmail.com','Cake',SHA2('123',256),'01-06-2021',87654321);

/* Create a default Owner */
INSERT INTO Owners VALUES (1,'Bob','Noss','111 Tree St', 5005, NULL, 'bobo@test.corn','Bobo',SHA2('123',256),'1950-05-12',123123);

/* Create a default Admin */
INSERT INTO Admins VALUES (1,'Barack','Obama','edbenchn@gmail.com',SHA2('yeswecan',256),'BarackObama');

/* Default Business */
INSERT INTO Business VALUES (1,"Bob's Restaurant",200,100,'Restaurant',1515151,'10 City St',5000,'AAABBBCCC', 3);

INSERT INTO Business VALUES (3,"Bob's Restaurant",200,100,'Restaurant',99999,'10 mary St',5000,'ZZZZZZ', 3);



SELECT Business.name, Business.venue_size AS b_size, Business.business_type AS b_type FROM Business INNER JOIN Owners ON Business.owner_id = Owners.id WHERE Owners.username = ?;


UPDATE Business INNER JOIN Owners ON Business.owner_id = Owners.id
SET Business.name = "BOBBY MACGUIRE", Business.venue_size = 500, Business.business_type = "Service"
WHERE Owners.username = "Bobo" AND Business.name = "BOB THE BUILDER";

/* Add Business */
INSERT INTO Business (id, name, venue_size, business_type, business_number, address, zip, business_code, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, (SELECT id FROM Owners WHERE Owners.username = ?));

INSERT INTO Business (id, name, venue_size, business_type, business_number, address, zip, business_code, owner_id) VALUES (5, "BOB FISH", 2000, "F&B", 999999, "20 Drive St", "5000", "XXVVBBC", (SELECT id FROM Owners WHERE Owners.username = "Bobo"));

UPDATE Business INNER JOIN Owners ON Business.owner_id = Owners.id
SET flag = 0
WHERE Owners.username = "Bobo" AND Business.name = "BOBBY SPAGHETTI LOL";