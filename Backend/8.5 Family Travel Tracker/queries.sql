CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  country_name VARCHAR(45),
  country_code CHAR(2)
)
--- populate countries from some source before executing the rest---


DROP TABLE IF EXISTS visited_countries, users, countries;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(15) UNIQUE NOT NULL,
color VARCHAR(15)
);

CREATE TABLE visited_countries(
country_id INTEGER REFERENCES countries(id),
user_id INTEGER REFERENCES users(id),
PRIMARY KEY(country_id, user_id)
);

INSERT INTO users (name, color)
VALUES ('Angela', 'teal'), ('Jack', 'powderblue');

INSERT INTO visited_countries (country_id, user_id)
VALUES (1, 1), (2, 1), (75,1), (3, 2), (4,2 ), (32,2);

SELECT u.id,u.name,u.color, c.country_code, c.country_name FROM visited_countries
JOIN users as u
ON u.id = user_id
JOIN countries as c
ON c.id = country_id;
