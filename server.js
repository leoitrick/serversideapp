const { urlencoded } = require("express");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const auth = require("./config/auth")(passport);
const home = require("./routes/home");
const register = require("./routes/register");
const login = require("./routes/login");
const account = require("./routes/account");

//connecting the data base using mongoose
mongoose.connect("mongodb://localhost/sample-store", (err, data) => {
  if (err) {
    console.log("DB Connection Failed");
    return;
  }

  console.log("DB Connection Success");
});

const app = express();
//connection the session
app.use(
  session({
    secret: "hahweuashfaf",
    resave: true,
    saveUninitialized: true,
  })
);
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//setting the views engine for templates
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", home);
app.use("/register", register);
app.use("/login", login);
app.use("/account", account);
//handling errors
app.use((err, req, res, next) => {
  res.render("/error", { message: err.message });
});

app.listen(5000);
console.log("App running on http://localhost:5000");
