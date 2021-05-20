const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    header: {
      type: String,
      required: true,
    },
    back: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    bodyIntro: {
      type: String,
      required: true,
    },
    meta: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mp_nws", newsSchema, "mp_news");
