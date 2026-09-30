const express = require("express");

const router = express.Router();

// POST analyze a task with AI
router.post("/analyze", async (req, res) => {
  try {
    const { title, priority, dueDate, estimatedMinutes } = req.body;

    if (!title || !priority || !dueDate || !estimatedMinutes) {
      return res.status(400).json({
        message: "Task information is incomplete",
      });
    }

    res.status(200).json({
      message: "AI analysis endpoint is working",
      task: {
        title,
        priority,
        dueDate,
        estimatedMinutes,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to analyze task",
      error: error.message,
    });
  }
});

module.exports = router;