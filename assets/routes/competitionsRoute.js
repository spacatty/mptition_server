const express = require("express");
const competitionsRoute = express.Router();
const competitionsSchema = require("../schemas/competitionsSchema");
const userSchema = require("../schemas/userSchema");

competitionsRoute.get("/", async (req, res) => {
  try {
    let everythingFound = await competitionsSchema.find({});
    res.status(200).send(everythingFound);
  } catch (error) {
    res.status(501).send({ error });
  }
});

competitionsRoute.post("/", async (req, res) => {
  const newCompetition = new competitionsSchema({
    header: req.body.header,
    stage: req.body.stage,
    location: req.body.location,
    back: req.body.back,
    date: req.body.date,
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

competitionsRoute.put("/", async (req, res) => {
  try {
    await competitionsSchema.findByIdAndUpdate(req.body.id, {
      header: req.body.header,
      stage: req.body.stage,
      location: req.body.location,
      back: req.body.back,
      date: req.body.date,
      reward: req.body.reward,
      participantsLimit: req.body.participantsLimit,
      currentParticipants: req.body.currentParticipants,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
});

competitionsRoute.delete("/", async (req, res) => {
  try {
    await competitionsSchema.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

competitionsRoute.post("/register", async (req, res) => {
  let userFoundOne = await userSchema.findOneAndUpdate(
    { gid: req.body.googleID },
    { $addToSet: { registeredCompetitions: req.body.competitionID } }
  );
  let compFoundOne = await competitionsSchema.findById(req.body.competitionID);
  compFoundOne.currentParticipants.includes(req.body.googleID)
    ? res.status(202).json({ success: true, message: "Already registered" })
    : (await competitionsSchema.findByIdAndUpdate(req.body.competitionID, {
        $addToSet: {
          currentParticipants: {
            userID: req.body.googleID,
            userName: Object.values(userFoundOne.userData).filter(
              (x) => x.split(` `).length >= 3
            )[0],
          },
        },
      })) && res.status(200).json({ success: true, message: "Registered" });
});

module.exports = competitionsRoute;
