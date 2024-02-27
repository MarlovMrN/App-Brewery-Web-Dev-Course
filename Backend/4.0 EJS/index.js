import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let weekdayOrWeekend;
  let advice;
  const currentDay = new Date().getDay();

  if (currentDay === 0 || currentDay === 6) {
    weekdayOrWeekend = "weekend";
    advice = "it's time to have fun";
  } else {
    weekdayOrWeekend = "weekday";
    advice = "it's time to work hard";
  }
  res.render("index.ejs", {
    weekdayOrWeekend: weekdayOrWeekend,
    advice: advice,
  });
});

app.listen(port, () => {
  console.log("listening on port ", port);
});
