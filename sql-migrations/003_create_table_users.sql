CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  email           VARCHAR(255) NOT NULL,
  passwd           VARCHAR(255) NOT NULL,
  user_type_id     INTEGER NOT NULL default 0
);
