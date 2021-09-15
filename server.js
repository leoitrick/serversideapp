const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.send("this is the local home");
});

app.listen(5000);
console.log("App running on http://localhost:5000");
