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
          if (err) {
            res.status(401);
          } else {
            res.status(201).render("callback", { token });

            window.localStorage.setItem({ token });
            window.localStorage.setItem("test", "test");
          }
        })
      : res.status(401);
  }
);

authRoute.get("/logout", (req, res) => {
  res.status(201).json(req.headers);
});

module.exports = authRoute;
