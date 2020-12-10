CREATE DATABASE IF NOT EXISTS Diary;
Use Diary;

CREATE TABLE IF NOT EXISTS Users (
	id int NOT NULL AUTO_INCREMENT, 
    Username varchar(255) NOT NULL UNIQUE, 
    Hash_password varchar(255) not null, 
    PRIMARY KEY (id)
    );
    
CREATE TABLE IF NOT EXISTS Entries (
	id int NOT NULL AUTO_INCREMENT,
    User_id int NOT NULL,
    Title varchar(2048) NOT NULL,
    Content varchar(2048) NOT NULL,
	Time_created DATETIME NOT NULL,
    primary key (id),
    foreign key (User_id) REFERENCES Users(id)
    );
    
