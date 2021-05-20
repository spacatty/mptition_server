const mongoose = require("mongoose");

const competitionsSchema = mongoose.Schema(
  {
    header: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    }, 
    date: {
      type: String,
      required: true,
    },
    back: {
      type: String,
      required: false,
    },
    reward: {
      type: String,
      required: true,
    },
    participantsLimit: {
      type: Number,
      required: true,
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
