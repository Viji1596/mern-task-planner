import { useState } from "react";

function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    if (!dueDate) {
      setError("Deadline is required");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (dueDate < today) {
      setError("Deadline cannot be before today");
      return;
    }

    if (!estimatedMinutes || Number(estimatedMinutes) < 1) {
      setError("Estimated time must be at least 1 minute");
      return;
    }

    setError("");

    try {
      const response = await fetch("https://mern-task-planner-2ymn.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          priority,
          dueDate,
          estimatedMinutes: Number(estimatedMinutes),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create task");
        return;
      }

      setTitle("");
      setPriority("Medium");
      setDueDate("");
      setEstimatedMinutes("");

      onTaskAdded();
    } catch (error) {
      setError("Could not connect to the server");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Deadline</label>
        <input
          type="date"
          value={dueDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Estimated Time (minutes)</label>
        <input
          type="number"
          min="1"
          value={estimatedMinutes}
          onChange={(event) => setEstimatedMinutes(event.target.value)}
          placeholder="e.g. 60"
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button className="add-button" type="submit">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;