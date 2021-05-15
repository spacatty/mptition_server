const express = require("express");
const dashRoute = express.Router();
const vT = require("../middlewares/jwt");
const userSchema = require("../schemas/userSchema");

dashRoute.get("/", vT, (req, res) => {
  res.status(200).json({ Message: "Okay, Hello" });
});

dashRoute.get("/users", vT, async (req, res) => {
  try {
    res.json(await userSchema.find({}));
  } catch (error) {
    res.status(500).json({ Message: "Okay, Hello" });
  }
});

module.exports = dashRoute;
