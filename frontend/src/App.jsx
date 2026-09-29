import { useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  const handleTaskAdded = () => {
    setRefresh((current) => !current);
  };

  const toggleTheme = () => {
  setDarkMode((current) => {
    const newMode = !current;

    localStorage.setItem("darkMode", newMode);

    return newMode;
  });
};

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <div className="container">
        <div className="header">
          <div>
            <h1>Task Planner</h1>
            <p className="subtitle">
              Manage your tasks, priorities, and progress.
            </p>
          </div>

          <button className="theme-button" onClick={toggleTheme}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <AddTaskForm onTaskAdded={handleTaskAdded} />
        <TaskList refresh={refresh} />
      </div>
    </div>
  );
}

export default App;