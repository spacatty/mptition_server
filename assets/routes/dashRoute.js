const express = require("express");
const dashRoute = express.Router();
const vT = require("../middlewares/jwt");

dashRoute.get("/", vT, (req, res) => {
  res.status(200).json({ Message: "Okay, Hello" });
});

module.exports = dashRoute;
