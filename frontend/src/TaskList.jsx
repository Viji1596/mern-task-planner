import { useEffect, useState } from "react";

function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const url =
        priority === "All"
          ? "https://mern-task-planner-2ymn.onrender.com/api/tasks"
          : `https://mern-task-planner-2ymn.onrender.com/api/tasks?priority=${priority}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to fetch tasks");
        return;
      }

      setTasks(data);
      setError("");
    } catch (error) {
      setError("Could not connect to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [priority, refresh]);

  const completeTask = async (id) => {
    try {
      const response = await fetch(
        `https://mern-task-planner-2ymn.onrender.com/api/tasks/${id}/complete`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to complete task");
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === id ? data : task
        )
      );

      setError("");
    } catch (error) {
      setError("Could not connect to the server");
    }
  };

  const deleteTask = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `https://mern-task-planner-2ymn.onrender.com/api/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to delete task");
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id)
      );

      setError("");
    } catch (error) {
      setError("Could not connect to the server");
    }
  };

  return (
    <div>
      <div className="tasks-header">
        <h2>Tasks</h2>

        <span className="task-count">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      <div className="filter-section">
        <label>Filter by Priority:</label>

        <select
          className="priority-filter"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
  <h3>No tasks found</h3>
  <p>Add a new task to get started.</p>
</div>
      ) : (
        <div className="table-container">
          <table className="task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Est. Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>

                  <td>
  <span
    className={`priority priority-${task.priority.toLowerCase()}`}
  >
    {task.priority}
  </span>
</td>

<td>
  {new Date(task.dueDate).toLocaleString([], {
  dateStyle: "medium",
  timeStyle: "short",
})}
</td>

<td>
  {task.estimatedMinutes} min
</td>

<td>
  <span
    className={
      task.completed
        ? "status-completed"
        : "status-pending"
    }
  >
    {task.completed ? "Completed" : "Pending"}
  </span>
</td>

                  <td className="actions">
                    {!task.completed && (
                      <button
                        className="complete-button"
                        onClick={() => completeTask(task._id)}
                      >
                        Complete
                      </button>
                    )}

                    <button
                      className="delete-button"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TaskList;