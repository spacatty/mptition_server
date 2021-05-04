const express = require("express");
const newsRoute = express.Router();
const newsSchema = require("../schemas/newsSchema");

newsRoute.get("/", async (req, res) => {
  console.log(req.user);
  try {
    const everythingFound = await newsSchema.find({});
    res.status(200).send(everythingFound);
  } catch (error) {
    res.status(501).send({ error });
  }
});

newsRoute.post("/create", async (req, res) => {
  const newNews = new newsSchema({
    header: req.body.header,
    author: req.body.author,
    body: req.body.body,
    meta: req.body.meta,
  });
  try {
    const savedEntry = await newNews.save();
    res.status(201).send({ savedEntry });
  } catch (error) {
    res.status(501).send({ error });
  }
});

module.exports = newsRoute;
