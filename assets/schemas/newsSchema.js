const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    header: {
      type: String,
    },
    author: {
      type: String,
    },
    body: {
      type: String,
    },
    meta: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mp_nws", newsSchema, "mp_news");
