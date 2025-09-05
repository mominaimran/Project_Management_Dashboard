# 📊 Project Management Dashboard

A modern and intuitive **MERN stack Project Management Dashboard** to create, manage, and track projects & tasks efficiently.  

🚀 **Live Demo:** [Project Management Dashboard](https://project-management-dashboard-blue.vercel.app/)     
💻 **Backend API:** [Railway Deployment](https://projectmanagementdashboard-production.up.railway.app)  
_(⚠️ Note: This is a REST API, so opening the link directly may not show UI. Try endpoints like `/api/projects`.)_

---

## ✨ Features
- 🔐 User Authentication (JWT + Cookies)
- 📂 Create & Manage Projects
- ✅ Task Management with Status Tracking
- 📅 Deadlines & Due Dates
- 📊 Dashboard with KPIs & Insights
- 🎨 Clean & Responsive UI (Tailwind + React)

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  
- **Deployment:** Vercel (Frontend), Railway (Backend)  

---

## 🖼️ Demo Preview (Optional)
![Dashboard Screenshot](./images/dashboard.png)  
> Replace `./images/dashboard.png` with your actual screenshot path if adding images.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ (for running both client & server)
- MongoDB Atlas account OR Local MongoDB setup
- Git (to clone and manage the repository)
- A package manager: npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/mominaimran/Project_Management_Dashboard.git

# Navigate into project directory
cd Project_Management_Dashboard

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Variables
Create a `.env` file in the **backend** folder with:

```bash
PORT=5001
MONGODB_URL=your-mongodb-uri
SALT_ROUNDS=10
JWT_SECRET=your-jwt-secret
NODE_ENV=development
CLIENT_URL=https://your-frontend-url.com
```
For Frontend:
```bash
VITE_API_URL=https://your-backend-api.com/api
```

### Running the App

```bash
# Start backend server first
cd backend
npm run dev

# Open a new terminal and start frontend
cd frontend
npm run dev
```
---

## 👩‍💻 Author
Developed with ❤️ by [Momina Imran](https://your-portfolio-link.com)

