const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", LogSchema);
