const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    gid: {
      type: String,
      required: true,
      unique: true,
    },
    privilege: {
      type: Number,
      required: false,
    },
    userData: {
      type: Object,
    },
    registeredCompetitions: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mp_usr", userSchema, "mp_user");
