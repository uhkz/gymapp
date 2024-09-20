const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

// Create a new log
router.post("/", async (req, res) => {
  const { userId, exerciseName, reps, weight } = req.body;
  try {
    const newLog = new Log({
      userId,
      exerciseName,
      reps,
      weight,
    });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get the latest logs for the user
router.get("/latest/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const latestLogs = await Log.find({ userId }).sort({ date: -1 }).limit(10);
    res.json(latestLogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all logs for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const logs = await Log.find({ userId }).sort({ date: 1 }); // Sort from oldest to newest
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get the latest log for each exercise for the user
router.get("/latestPerExercise/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const latestLogs = await Log.aggregate([
      { $match: { userId } },
      { $sort: { date: -1 } },
      {
        $group: {
          _id: "$exerciseName",
          latestLog: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$latestLog" } },
    ]);
    res.json(latestLogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete all logs for a specific exercise for the user
router.delete("/delete/:userId/:exerciseName", async (req, res) => {
  const { userId, exerciseName } = req.params;
  try {
    await Log.deleteMany({ userId, exerciseName });
    res.status(200).json({ message: "Logs deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
