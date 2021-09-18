const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) {
      res.json({
        confirmation: "fail",
        error: err,
      });
      return;
    }
    res.json({
      confirmation: "success",
      user: user,
    });
  });
});

module.exports = router;
