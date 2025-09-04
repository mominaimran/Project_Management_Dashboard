import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protectRoute } from "../middleware/authCheck.js";

const router = express.Router();

router.post("/", protectRoute, createTask);
router.get("/", protectRoute, getTasks); 
router.put("/:id", protectRoute, updateTask);
router.delete("/:id", protectRoute, deleteTask);

export default router;
