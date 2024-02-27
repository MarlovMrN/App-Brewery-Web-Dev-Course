//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

let isUserAuthorized = false;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (isUserAuthorized) res.sendFile(__dirname + "/public/secret.html");
  else res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function passwordCheck(req, res, next) {
  if (req.body.password === "ILoveCS") isUserAuthorized = true;
  else isUserAuthorized = false;
  next();
}
