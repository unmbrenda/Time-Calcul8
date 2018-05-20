DROP DATABASE IF EXISTS eztime_db_test;
CREATE DATABASE eztime_db_test;
USE eztime_db_test;

CREATE TABLE job_positions(
position_id INT NOT NULL AUTO_INCREMENT,
position_name VARCHAR(100) NULL,
pay_rate FLOAT NULL,
PRIMARY KEY (position_id)
);

CREATE TABLE users (

	employee_id INT NOT NULL AUTO_INCREMENT,
    position_id INT NOT NULL,
    first_name varchar(20) null,
    last_name varchar(20) null,
    email varchar(100) not null,
    user_password varchar(100) not null,
    primary key (employee_id),
    foreign key (position_id) references job_positions (position_id)
); 
ALTER TABLE users AUTO_INCREMENT = 1000;


CREATE TABLE time_sheet(
	id INT(20) NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
    time_punch datetime NULL,
    punch_code ENUM ('clockIn','clockOut'),
    PRIMARY KEY (id),
    FOREIGN KEY (employee_id) references users (employee_id)
);
DESCRIBE time_sheet;
