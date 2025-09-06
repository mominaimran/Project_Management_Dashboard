import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://project-management-dashboard-blue.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running 🚀",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
  });
});
