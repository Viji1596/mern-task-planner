const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// GET all tasks / filter by priority
router.get("/", async (req, res) => {
  try {
    const { priority } = req.query;

    let filter = {};

    if (priority) {
      if (!["Low", "Medium", "High"].includes(priority)) {
        return res.status(400).json({
          message: "Priority must be Low, Medium, or High",
        });
      }

      filter.priority = priority;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
});

// POST create a task
router.post("/", async (req, res) => {
  try {
    const { title, priority, dueDate, estimatedMinutes } = req.body;

    // Validate title
    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title cannot be empty",
      });
    }

    // Validate priority
    if (!["Low", "Medium", "High"].includes(priority)) {
      return res.status(400).json({
        message: "Priority must be Low, Medium, or High",
      });
    }

    // Validate deadline exists
    if (!dueDate) {
      return res.status(400).json({
        message: "Deadline is required",
      });
    }

    // Validate estimated time
    if (!estimatedMinutes || Number(estimatedMinutes) < 1) {
      return res.status(400).json({
        message: "Estimated time must be at least 1 minute",
      });
    }

    // Convert deadline to Date
    const deadline = new Date(dueDate);

    // Validate deadline format
    if (isNaN(deadline.getTime())) {
      return res.status(400).json({
        message: "Invalid deadline",
      });
    }

    // Deadline must allow enough time to complete the task
    const minimumDeadline = new Date();

    minimumDeadline.setMinutes(
      minimumDeadline.getMinutes() + Number(estimatedMinutes)
    );

    if (deadline < minimumDeadline) {
      return res.status(400).json({
        message: "Deadline must allow enough time to complete the task",
      });
    }

    // Create task
    const task = new Task({
      title: title.trim(),
      priority,
      dueDate: deadline,
      estimatedMinutes: Number(estimatedMinutes),
      scheduledStart: null,
      scheduledEnd: null,
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
});

// PUT complete a task
router.put("/:id/complete", async (req, res) => {
  try {
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.completed) {
      return res.status(400).json({
        message: "Task is already completed",
      });
    }

    task.completed = true;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to complete task",
      error: error.message,
    });
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
});

module.exports = router;