use board;

create table d_board(
    id VARCHAR(20),
    password VARCHAR(100) NOT NULL,
    name VARCHAR(20) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    primary key(id)
);
