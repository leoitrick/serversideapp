const express = require("express");

const router = express.Router();

router.post("/", (req, res, next) => {
  res.json({
    data: req.body,
  });
});

module.exports = router;
