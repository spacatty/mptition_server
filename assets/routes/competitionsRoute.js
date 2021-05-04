const express = require("express");
const competitionsRoute = express.Router();
const competitionsSchema = require("../schemas/competitionsSchema");

competitionsRoute.get("/", async (req, res) => {
  try {
    const everythingFound = await competitionsSchema.find({});
    res.status(200).send(everythingFound);
  } catch (error) {
    res.status(501).send({ error });
  }
});

competitionsRoute.post("/create", async (req, res) => {
  const newCompetition = new competitionsSchema({
    header: req.body.header,
    stage: req.body.stage,
    location: req.body.location,
    date: Date.now(),
    reward: req.body.reward,
    participantsLimit: req.body.participantsLimit,
    currentParticipants: req.body.currentParticipants,
  });
  try {
    const savedEntry = await newCompetition.save();
    res.status(201).send({ savedEntry });
  } catch (error) {
    res.status(501).send({ error });
  }
});

module.exports = competitionsRoute;
