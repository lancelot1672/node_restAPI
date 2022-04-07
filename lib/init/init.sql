use board;

grant all privileges on board.* to 'dore'@'%';

ALTER USER 'dore'@'%' IDENTIFIED WITH mysql_native_password BY 'abcd1234';

flush privileges;

create table member(
    id VARCHAR(30),
    password VARCHAR(100) NOT NULL,
    name VARCHAR(20) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    primary key(id),
    UNIQUE INDEX `nick` (nickname)
);

CREATE TABLE d_board(
    id int AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    author VARCHAR(30) NOT NULL,
    category VARCHAR(30) NOT NULL,
    writedate datetime DEFAULT now(),
    primary key(id),
    foreign key(author) references member(nickname) on update cascade on delete cascade
);

insert into d_board VALUES(DEFAULT, 'MySQL','MySQL is ...', '동동목장','IT',DEFAULT);
insert into d_board VALUES(DEFAULT, 'NodeJs','NodeJs is ...', '중복닉네임','IT',DEFAULT);
insert into d_board VALUES(DEFAULT, 'Java 11','Java is ...', '중복닉네임','IT',DEFAULT);
insert into d_board VALUES(DEFAULT, 'Oracle Cloud','Oracle Cloud is ...', '중복닉네임','IT',DEFAULT);
insert into d_board VALUES(DEFAULT, 'Spring Boot','Spring Boot is ...', '중복닉네임','IT',DEFAULT);