const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/User");

module.exports = (passport) => {
  passport.serializeUser((user, next) => {
    next(null, user);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id, (err, user) => {
      next(err, user);
    });
  });

  const localLogin = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, next) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return next(err);
        }

        // check if user is found
        if (user == null) {
          return next(new Error("User Not Found!"));
        }

        // handle password verification
        if (user.password != req.body.password) {
          return next(new Error("Incorrect Password"));
        }

        return next(null, user);
      });
    }
  );

  passport.use("localLogin", localLogin);
};
