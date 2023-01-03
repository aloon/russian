CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  email           VARCHAR(255) NOT NULL,
  passwd           VARCHAR(255) NOT NULL,
  user_type_id     INTEGER NOT NULL default 0
);

insert into users (email, passwd, user_type_id) values ('aloon.com@gmail.com', md5('moqueta..'), 1);
insert into users (email, passwd, user_type_id) values ('elenamanukhina@gmail.com', md5('alexandra'), 1);
insert into users (email, passwd, user_type_id) values ('test@test.test', md5('test'), 0);
