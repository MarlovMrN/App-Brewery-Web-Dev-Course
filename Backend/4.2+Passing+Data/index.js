import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  res.render("index.ejs", {
    letterCount:
      req.body.fName.replace(/\s+/g, "").length +
      req.body.lName.replace(/\s+/g, "").length,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
