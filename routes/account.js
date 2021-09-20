const express = require("express");

const router = express.Router();

const items = [
  { name: "item 1", description: "", price: 10 },
  { name: "item 2", description: "", price: 20 },
  { name: "item 3", description: "", price: 15 },
  { name: "item 4", description: "", price: 30 },
  { name: "item 5", description: "", price: 40 },
];

router.get("/", (req, res, next) => {
  const user = req.user;
  if (user == null) {
    res.redirect("/");
    return;
  }

  const data = {
    user: user,
  };

  res.render("account", data);
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
