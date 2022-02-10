-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  post VARCHAR(255)
);

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  username TEXT NOT NULL,
  email TEXT
);