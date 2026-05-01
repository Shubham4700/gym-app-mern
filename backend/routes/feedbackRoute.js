const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

// POST FEEDBACK
router.post("/feedback", async (req, res) => {
  try {
    const { rating, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newFeedback = await Feedback.create({ rating, message });

    res.json({ success: true, data: newFeedback });

  } catch (error) {
    console.log("ERROR",error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL FEEDBACK
router.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    // 🔥 calculate avg
    const avg =
      feedbacks.reduce((acc, f) => acc + f.rating, 0) /
      (feedbacks.length || 1);

    res.json({
      feedbacks,
      avgRating: avg.toFixed(1),
      total: feedbacks.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;