const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route to get user profile
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

// Route to update profile picture
router.post(
  "/profile-picture/:userId",
  upload.single("profilePicture"),
  async (req, res) => {
    const { userId } = req.params;
    const profilePicture = req.file.path;

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { profilePicture },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error updating profile picture" });
    }
  }
);

module.exports = router;
