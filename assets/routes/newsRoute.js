const express = require("express");
const newsRoute = express.Router();
const newsSchema = require("../schemas/newsSchema");

newsRoute.get("/", async (req, res) => {
  try {
    const everythingFound = await newsSchema.find({});
    res.status(200).send(everythingFound);
  } catch (error) {
    res.status(501).send({ error });
  }
});

newsRoute.post("/", async (req, res) => {
  const newNews = new newsSchema({
    header: req.body.header,
    back: req.body.back,
    author: req.body.author,
    body: req.body.body,
    bodyIntro: req.body.bodyIntro,
    meta: req.body.meta,
  });
  try {
    const savedEntry = await newNews.save();
    res.status(201).send({ savedEntry });
  } catch (error) {
    res.status(501).send({ error });
  }
});

newsRoute.put("/", async (req, res) => {
  try {
    await newsSchema.findByIdAndUpdate(req.body.id, {
      header: req.body.header,
      back: req.body.back,
      author: req.body.author,
      body: req.body.body,
      bodyIntro: req.body.bodyIntro,
      meta: req.body.meta,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  }
});

newsRoute.delete("/", async (req, res) => {
  try {
    await newsSchema.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = newsRoute;
