const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
        if (bcrypt.compareSync(password, user.password) == false) {
          return next(new Error("Incorrect Password"));
        }

        return next(null, user);
      });
    }
  );

  passport.use("localLogin", localLogin);

  const localRegister = new LocalStrategy(
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

        // check if user exists
        if (user != null) {
          return next(new Error("User already exists! Please log in"));
        }

        //Create new user

        //encrypting the password
        const hashedPw = bcrypt.hashSync(password, 10);
        User.create({ email: email, password: hashedPw }, (err, user) => {
          if (err) {
            return next(err);
          }
          next(null, user);
        });
      });
    }
  );
  passport.use("localRegister", localRegister);
};
