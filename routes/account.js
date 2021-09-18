const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    user: req.user || "Not Logged in",
  });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.json({
    confirmation: "User Logged out!",
  });
});

module.exports = router;
