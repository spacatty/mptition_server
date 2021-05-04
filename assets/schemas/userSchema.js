const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    gid: {
      type: String,
    },
    privilege: {
      type: Number,
    },
    userData: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mp_usr", userSchema, "mp_user");
