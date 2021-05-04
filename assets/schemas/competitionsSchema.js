const mongoose = require("mongoose");

const competitionsSchema = mongoose.Schema(
  {
    header: {
      type: String,
    },
    stage: {
      type: String,
    },
    location: {
      type: String,
    },
    date: {
      type: Date,
    },
    reward: {
      type: String,
    },
    participantsLimit: {
      type: Number,
    },
    currentParticipants: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "mp_comp",
  competitionsSchema,
  "mp_competitions"
);
