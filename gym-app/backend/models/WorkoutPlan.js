const mongoose = require("mongoose");

const workoutPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [
    {
      id: String,
      name: String,
      bodyPart: String,
      equipment: String,
      gifUrl: String,
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
