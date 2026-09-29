# AI Smart Task Planner

A full-stack MERN-based task management application that helps users create, organize, prioritize, and track their tasks with deadlines and estimated completion times.

## Features

- Create tasks with:
  - Task title
  - Priority
  - Deadline
  - Estimated completion time
- Priority levels:
  - Low
  - Medium
  - High
- Filter tasks by priority
- Mark tasks as completed
- Delete tasks
- Prevent deadlines earlier than the current date
- Input validation and error handling
- Task status tracking
- Light and dark mode
- Persistent data storage using MongoDB Atlas
- REST API using Express.js

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- Mongoose
- CORS
- dotenv

### Database
- MongoDB Atlas

### Tools
- Visual Studio Code
- Git
- GitHub
- AI coding assistant

## Project Structure

```text
mern-task-planner/
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   ├── taskRoutes.js
│   │   └── aiRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── AddTaskForm.jsx
│   │   ├── TaskList.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
└── README.md
