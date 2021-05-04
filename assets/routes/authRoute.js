const express = require("express");
const passport = require("passport");
const authRoute = express.Router();
const jwt = require("jsonwebtoken");


authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    req.user
      ? jwt.sign({ user: req.user }, process.env.JWT_SECRET, (err, token) => {
          err ? res.status(401) : res.status(201).json({ token });
        })
      : res.status(401);
  }
);

authRoute.get("/logout", (req, res) => {
  res.status(201).json(req.headers);
});

module.exports = authRoute;
