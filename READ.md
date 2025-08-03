# **Task & To-Do Management System**

## 📌 Introduction
**"Task Manager** - Task Management System with Sub-Tasks (To-Dos)**”** is a web platform that enables admins to create tasks, set priorities, assign task to users, and track progress in real-time. With clear priority levels and status updates, it ensures better organization, accountability, and productivity within teams. The system enhances collaboration, prevents delays, and ensures all team members stay updated on progress in real time. Built with Mongoose, Node.js, Express, and React, it offers a scalable and modern solution for task management.


## 🚀 Features
### **Admin**
- Create, edit, and delete tasks
- Add sub-tasks (to-dos) under each task
- Set task priority and status
- Assign tasks to one or more users
- Track progress in real time

### **User**
- View assigned tasks and to-dos
- Update progress and mark to-dos as completed
- Receive updates on changes


## 🗂 Priority & Status System
**Priority Levels:**
- 🟢 Low → Minimal urgency
- 🟡 Medium → Important but not urgent
- 🔴 High → Critical and urgent

**Status Levels:**
- ⏳ Pending → Not started
- 🔄 In Progress → Work ongoing
- ✅ Completed → Finished


## 🛠 Technology Stack
- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT
- **Hosting:** Vercel (Frontend) + Render (Backend)


## 📂 Mongoose Models
### **User Model**
- `name`: String  
- `email`: String  
- `password`: String  
- `imgUrl`: String 
- `role`: admin / user  
- `timestamps`

### **Task Model**
- `title`: String  
- `description`: String  
- `priority`: low / medium / high  
- `status`: pending / in progress / completed  
- `assignedTo`: ref → User  
- `dueDate`: Date 
- `attachments`: [String]
- `todos`: [ text, completed ]  
- `timestamps`



## ⚙️ Project Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/ratan-kumar-git/Task-Manager
cd Task-Manager
```

### **2️⃣ Backend Setup**
```bash
cd Backend
npm install
```

- **Create a .env file inside the backend folder:**
    ```bash
    PORT=8000
    CLINT_URL = http://localhost:5173
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskdb
    JWT_SECRET=your_jwt_secret
    ADMIN_INVITE_TOKEN = admin_invite_token
    ```
- **Start the backend server:**
    ```bash
    npm run dev
    ```
### **3️⃣ Frontend Setup**
```bash
cd ../Frontend-task-manager
npm install
```
- **Create a .env file inside the frontend folder:**
    ```bash
    VITE_API_URL=http://localhost:8000
    ```
- **Start the backend server:**
    ```bash
    npm run dev
    ```


## 🔄 Workflow
1. Admin creates a task
2. Adds sub-tasks (to-dos)
3. Assigns users to the task
4. Users update progress
5. Admin tracks and closes tasks



## 📈 Future Enhancements
- Deadline tracking with reminders
- Comment section for collaboration

---
## 📜 License
This project is licensed under the **MIT License**.
