import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: process.env.POSTGRESS_PASSWORD,
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

async function getUsers() {
  const result = await db.query("SELECT * from users");
  return result.rows;
}

function createCountryCodeQuery(values) {
  const wordCount = values.length;

  let queryString = "Select id FROM countries WHERE country_name ILIKE $1 ";
  for (let i = 2; i <= wordCount; i++) {
    queryString += `AND country_name ILIKE $${i} `;
  }
  return queryString;
}

function addValuesWildcard(values) {
  const newValues = [];
  values.forEach((element) => {
    newValues.push("%" + element + "%");
  });
  return newValues;
}

async function queryCountry(countryName, flexibleSearch) {
  let queryValues = flexibleSearch
    ? countryName.trim().split(" ")
    : [countryName.trim()];

  const queryString = createCountryCodeQuery(queryValues);

  queryValues = flexibleSearch ? addValuesWildcard(queryValues) : queryValues;

  const result = await db.query(queryString, queryValues);

  return result;
}

async function checkVisited(currentUserId) {
  const result = await db.query(
    "SELECT c.country_code FROM visited_countries as vc JOIN users as u ON vc.user_id = u.id JOIN countries as c ON c.id = vc.country_id WHERE u.id = $1 ",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  users = await getUsers();
  const countries = await checkVisited(currentUserId);
  const currentUser = users.find((user) => {
    return user.id == currentUserId;
  });
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    currentUser: currentUser,
    color: currentUser ? currentUser.color : "",
  });
});

app.post("/add", async (req, res) => {
  if (!req.body.country) {
    res.sendStatus(400);
  }
  const countryName = req.body.country;
  let result;

  result = await queryCountry(countryName, false);

  if (result.rowCount == 0) {
    result = await queryCountry(countryName, true);
  }

  if (result.rowCount == 1) {
    try {
      await db.query(
        "INSERT INTO visited_countries (country_id, user_id) VALUES ($1,$2)",
        [result.rows[0].id, currentUserId]
      );

      res.redirect("/");
    } catch (error) {
      const countries = await checkVisited(currentUserId);
      const currentUser = users.find((user) => {
        return user.id == currentUserId;
      });
      if (error.code == 23505) {
        res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          users: users,
          currentUser: currentUser,
          color: currentUser.color,
          error: "Country Already Added",
        });
      } else {
        console.log(error);
        res.redirect("/");
      }
    }
  } else if (result.rowCount == 0) {
    const countries = await checkVisited(currentUserId);
    const currentUser = users.find((user) => {
      return user.id == currentUserId;
    });
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      currentUser: currentUser,
      color: currentUser ? currentUser.color : "",
      error: "Country Not Found, type in english with proper accentuation",
    });
  } else {
    const countries = await checkVisited(currentUserId);
    const currentUser = users.find((user) => {
      return user.id == currentUserId;
    });
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      currentUser: currentUser,
      color: currentUser.color,
      error:
        "Resulted in more than one Country, please use the country complete name",
    });
  }
});

app.post("/user", async (req, res) => {
  const createUser = req.body.add === "new";
  if (createUser) {
    res.render("new.ejs");
  } else {
    const userId = req.body.user;
    currentUserId = userId;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const userName = req.body.name;
  const userColor = req.body.color;
  if (!(userName && userColor)) {
    res.send(400);
  } else {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1,$2) RETURNING id",
      [userName, userColor]
    );
    currentUserId = result.rows[0].id;
    res.redirect("/");
  }

  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
