create database SpotPer
use SpotPer

create table Usuario (
    email varchar(60) PRIMARY KEY,
    username varchar(40) UNIQUE NOT NULL,
    password varchar(64) NOT NULL
)