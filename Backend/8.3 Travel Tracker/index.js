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

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country FROM visited_countries");
  const visitedCountriesArray = [];
  result.rows.forEach((element) => {
    visitedCountriesArray.push(element.country);
  });
  res.render("index.ejs", {
    countries: visitedCountriesArray,
  });
});

app.post("/add", async (req, res) => {
  const countryName = req.body.country;
  const result = await db.query(
    "SELECT country_code from countries where LOWER(country_name) ILIKE $1",
    [countryName.toLowerCase()]
  );

  if (result.rowCount == 0) {
    try {
      await db.query("INSERT INTO visited_countries (country) VALUES ($1)", [
        result.rows[0].country_code,
      ]);
    } catch (error) {
      if (!(error.code == 23505)) {
        console.log(error);
      }
    }

    visitedCountriesArray.push(result.rows[0].country_code);
    res.redirect("/");
    
  }

  // const countryCode = res.render("index.ejs", {
  //   countries: visitedCountriesArray,
  //   total: visitedCountriesArray.length,
  // });
  // res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
