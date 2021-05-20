const express = require("express");
const authRoute = express.Router();
const userSchema = require("../schemas/userSchema");

authRoute.post("/serialize", async (req, res) => {
  userSchema.where({ gid: req.body.googleID }).exec((err, retnUser) => {
    if (err) {
      res.json({ success: false, err });
    } else {
      if (retnUser.length === 0) {
        try {
          const newUser = new userSchema({
            gid: req.body.googleID,
            privilege: 0,
            userData: req.body.userData,
          });
          newUser
            .save()
            .then((sU) => res.status(201).json({ success: true, sU }));
        } catch (error) {
          res.json({ success: false, err });
        }
      } else {
        res.status(200).json({
          success: true,
          comps: retnUser[0].registeredCompetitions,
          privilege: retnUser[0].privilege,
        });
      }
    }
  });
});

module.exports = authRoute;
