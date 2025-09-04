import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, project } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    if (!project) {
      return res.status(400).json({ message: "Project id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(project)) {
      return res.status(400).json({ message: "Invalid project id" });
    }

    const existingProject = await Project.findOne({
      _id: project,
      createdBy: req.user._id,
    });

    if (!existingProject) {
      return res
        .status(404)
        .json({ message: "Project not found or access denied" });
    }

    const validStatuses = ["todo", "in-progress", "done"];
    const taskStatus = validStatuses.includes(status) ? status : "todo";

    const newTask = await Task.create({
      title: title.trim(),
      description: description.trim(),
      status: taskStatus,
      project,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { project } = req.query;
    let filter = {};

    // ✅ Filter by specific project if provided
    if (project) {
      if (!mongoose.Types.ObjectId.isValid(project)) {
        return res.status(400).json({ message: "Invalid project id" });
      }

      const existingProject = await Project.findOne({
        _id: project,
        createdBy: req.user._id,
      });

      if (!existingProject) {
        return res
          .status(404)
          .json({ message: "Project not found or access denied" });
      }

      filter.project = project;
    } else {
      // ✅ Show tasks of all projects owned by user
      const userProjects = await Project.find({
        createdBy: req.user._id,
      }).select("_id");
      filter.project = { $in: userProjects.map((p) => p._id) };
    }

    // ✅ Populate project title for each task
    const tasks = await Task.find(filter)
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: project
        ? "Tasks for selected project fetched successfully"
        : "All tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error in getTasks controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findById(id).populate("project");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.project.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    const validStatuses = ["todo", "in-progress", "done"];
    const newStatus = validStatuses.includes(req.body.status)
      ? req.body.status
      : task.status;

    task.title = req.body.title?.trim() || task.title;
    task.description = req.body.description?.trim() || task.description;
    task.status = newStatus;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findById(id).populate("project");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.project.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
