const express = require("express");
const home = require("./routes/home");

const app = express();

app.use("/", home);

app.listen(5000);
console.log("App running on http://localhost:5000");
