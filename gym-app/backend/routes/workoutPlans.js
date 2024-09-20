const express = require("express");
const WorkoutPlan = require("../models/WorkoutPlan");

const router = express.Router();

// Create a new workout plan
router.post("/", async (req, res) => {
  console.log("Create workout plan request data:", req.body); // Add this line
  const { name, exercises, userId } = req.body;

  const workoutPlan = new WorkoutPlan({ name, exercises, userId });

  try {
    await workoutPlan.save();
    res.status(201).json(workoutPlan);
  } catch (error) {
    console.error("Error creating workout plan:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

// Get all workout plans for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching workout plans for user: ${userId}`); // Add this line

  try {
    const workoutPlans = await WorkoutPlan.find({ userId });
    res.status(200).json(workoutPlans);
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

// Get a single workout plan by id
router.get("/plan/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching workout plan with id: ${id}`); // Add this line

  try {
    const workoutPlan = await WorkoutPlan.findById(id);
    res.status(200).json(workoutPlan);
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);
    if (!workoutPlan) {
      return res.status(404).json({ message: "Workout plan not found" });
    }
    res.json({ message: "Workout plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
