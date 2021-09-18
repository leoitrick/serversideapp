const express = require("express");
const User = require("../models/User");
const passport = require("passport");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("localLogin", {
    successRedirect: "/account",
  })
),
  // router.post("/", (req, res, next) => {
  //   const email = req.body.email;
  //   User.findOne({ email: email }, (err, user) => {
  //     if (err) {
  //       return next(err);
  //     }

  //     // check if user is found
  //     if (user == null) {
  //       return next(new Error("User Not Found!"));
  //     }

  //     // handle password verification
  //     if (user.password != req.body.password) {
  //       return next(new Error("Incorrect Password"));
  //     }

  //     res.json({
  //       confirmation: "success",
  //       user: user,
  //     });
  //   });
  // });

  (module.exports = router);
