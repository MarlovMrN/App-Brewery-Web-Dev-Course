import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("test");
});

app.get("/contact", (req, res) => {
  res.send("test");
});

app.get("/about", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});