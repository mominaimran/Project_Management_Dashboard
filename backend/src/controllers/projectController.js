import mongoose from "mongoose";
import Project from "../models/Project.js";
import { dateValidator } from "../utils/dateValidator.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    if (!title || !description || !deadline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Validate date format and value
    const { isValid, isoDate, message } = dateValidator(deadline);
    if (!isValid) {
      return res.status(400).json({ message });
    }

    const project = await Project.create({
      title,
      description,
      deadline: isoDate,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.log(error, "Error in createProject controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: projects.length
        ? "Projects fetched successfully"
        : "No projects found",
      projects,
    });
  } catch (error) {
    console.log(error, "Error in getProjects controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Invalid project id" });
    const project = await Project.findOne({
      _id: id,
      createdBy: req.user._id,
    });
    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or not authorized" });
    }
    res.status(200).json({ message: "Project fetched successfully", project });
  } catch (error) {
    console.log(error, "Error in getProject controller");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    // Build update object dynamically
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (deadline) {
      const { isValid, isoDate, message } = dateValidator(deadline);
      if (!isValid) {
        return res.status(400).json({ message });
      }
      updateData.deadline = isoDate;
    }

    // If no fields provided
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const project = await Project.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or not authorized" });
    }

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error("Error in updateProject controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    // Only delete if it belongs to the logged-in user
    const project = await Project.findOneAndDelete({
      _id: id,
      createdBy: req.user._id,
    });

    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found or not authorized" });
    }

    res
      .status(200)
      .json({ message: "Project deleted successfully", deletedId: id });
  } catch (error) {
    console.error("Error in deleteProject controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
