import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protectRoute } from "../middleware/authCheck.js";

const router = express.Router();

router.post("/", protectRoute, createProject);
router.get("/", protectRoute, getProjects);
router.get("/:id", protectRoute, getProject);
router.put("/:id", protectRoute, updateProject);
router.delete("/:id", protectRoute, deleteProject);

export default router;
