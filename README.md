# MERN Task Planner

A full-stack Task Planner application built using the MERN stack.  
The application allows users to create, manage, filter, complete, and delete tasks while tracking priorities, deadlines, and estimated completion time.

---

## 🚀 Live Demo

### 🌐 [Open the Live Website](https://mern-task-planner-1-utzl.onrender.com)

The application is deployed and publicly accessible through Render.

**Frontend:** Render Static Site  
**Backend:** Render Web Service  
**Database:** MongoDB Atlas

---

## 📌 Features

- Create new tasks
- Set task priority
  - Low
  - Medium
  - High
- Set task deadline
- Set estimated completion time
- View all tasks
- Filter tasks by priority
- Mark tasks as completed
- Delete tasks
- Light/Dark theme
- Responsive user interface
- Persistent data using MongoDB Atlas

---

## 🛠️ Technologies Used

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

### Deployment
- GitHub
- Render

---

## 📂 Project Structure

```text
mern-task-planner/
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── taskRoutes.js
│   │   └── aiRoutes.js
│   │
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
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```
---

##Application Architecture
```text
                    ┌─────────────────────┐
                    │     User / Browser  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      (Render)        │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │      (Render)        │
                    └──────────┬──────────┘
                               │
                          Mongoose
                               │
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    └─────────────────────┘
