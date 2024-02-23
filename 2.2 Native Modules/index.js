const fs = require("fs");

fs.writeFile("message.txt", "hello file!", (err) => {
  if (err) throw err;
  console.log("file saved!");
});

fs.readFile("message.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
