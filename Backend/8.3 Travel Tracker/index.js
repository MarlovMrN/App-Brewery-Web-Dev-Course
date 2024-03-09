import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: process.env.POSTGRESS_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "world",
});

let visitedCountriesArray = [];

function createCountryCodeQuery(values) {
  const wordCount = values.length;

  let queryString =
    "Select country_code FROM countries WHERE country_name ILIKE $1 ";
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

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country FROM visited_countries");
  visitedCountriesArray = [];
  result.rows.forEach((element) => {
    visitedCountriesArray.push(element.country);
  });
  res.render("index.ejs", {
    countries: visitedCountriesArray,
  });
});

app.post("/reset", async (req, res) => {
  const result = await db.query("DELETE FROM visited_countries");
  res.redirect("/");
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
      await db.query("INSERT INTO visited_countries (country) VALUES ($1)", [
        result.rows[0].country_code,
      ]);
      res.redirect("/");
    } catch (error) {
      if (error.code == 23505) {
        res.render("index.ejs", {
          countries: visitedCountriesArray,
          total: visitedCountriesArray.length,
          error: "Country Already Added",
        });
      } else {
        console.log(error);
        res.redirect("/");
      }
    }
  } else if (result.rowCount == 0) {
    res.render("index.ejs", {
      countries: visitedCountriesArray,
      total: visitedCountriesArray.length,
      error: "Country Not Found, type in english with proper accentuation",
    });
  } else {
    res.render("index.ejs", {
      countries: visitedCountriesArray,
      total: visitedCountriesArray.length,
      error:
        "Resulted in more than one Country, please use the country complete name",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
