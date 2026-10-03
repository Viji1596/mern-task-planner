const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    estimatedMinutes: {
      type: Number,
      required: true,
      min: 1,
    },

    scheduledStart: {
      type: Date,
      default: null,
    },

    scheduledEnd: {
      type: Date,
      default: null,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);