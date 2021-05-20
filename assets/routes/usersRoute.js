const express = require("express");
const usersRoute = express.Router();
const userSchema = require("../schemas/userSchema");

usersRoute.get("/", async (req, res) => {
  try {
    res.status(200).json(await userSchema.find({}));
  } catch (error) {
    res.status(500).json({ error });
  }
});

usersRoute.put("/", async (req, res) => {
  try {
    await userSchema.findByIdAndUpdate(req.body.id, {
      privilege: req.body.privilege,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
});

usersRoute.delete("/", async (req, res) => {
  try {
    await userSchema.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = usersRoute;
