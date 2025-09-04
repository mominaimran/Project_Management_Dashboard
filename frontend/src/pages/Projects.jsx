import React, { useState, useEffect, useMemo } from "react";
import { Plus, X } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import useProjectStore from "../store/useProjectStore";
import useTaskStore from "../store/useTaskStore";
import formatDateForBackend from "../utils/formatDateForBackend";
import { getProjectTaskStats } from "../utils/taskStats";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const Projects = () => {
  const {
    projects,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    isCreatingProject,
    isUpdatingProject,
    error,
  } = useProjectStore();

  const { tasks, getTasks } = useTaskStore();

  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    getProjects();
    getTasks();
  }, []);

  const projectStats = useMemo(() => {
    const stats = {};
    (projects || []).forEach((project) => {
      stats[project._id || project.id] = getProjectTaskStats(
        tasks || [],
        project._id || project.id
      );
    });
    return stats;
  }, [projects, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleCreateOrUpdate = async () => {
    if (!newProject.title || !newProject.deadline) {
      toast.error("All fields are required");
      return;
    }

    const payload = {
      ...newProject,
      deadline: formatDateForBackend(newProject.deadline),
    };

    if (editingProject) {
      const { success } = await updateProject(editingProject._id, payload);
      if (success) {
        toast.success("Project updated successfully");
        setEditingProject(null);
        setNewProject({ title: "", description: "", deadline: "" });
        setShowModal(false);
      } else {
        toast.error("Failed to update project");
      }
    } else {
      const { success } = await createProject(payload);
      if (success) {
        toast.success("Project created successfully");
        setNewProject({ title: "", description: "", deadline: "" });
        setShowModal(false);
      } else {
        toast.error("Failed to create project");
      }
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      deadline: project.deadline,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const { success } = await deleteProject(id);
      if (success) {
        toast.success("Project deleted successfully");
      } else {
        toast.error("Failed to delete project");
      }
    }
  };

  return (
    <motion.div
      className="container mx-auto pt-6 pb-6 px-4 sm:px-6 relative"
      initial={{ x: "-20%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 60, // lower = smoother
        damping: 20,
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Projects</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage and track your projects
          </p>
        </div>
        <button
          className="bg-btn text-[var(--color-text-dark)] px-3 sm:px-4 py-2 rounded-md flex items-center gap-2 hover:bg-yellow-500 transition text-sm sm:text-base w-full sm:w-auto justify-center"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Projects Grid */}
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => {
            const stats = projectStats[project._id || project.id] || {
              completed: 0,
              total: 0,
              percent: 0,
              status: "in-progress",
            };
            return (
              <ProjectCard
                key={project._id || project.id}
                {...project}
                progress={stats.percent}
                completedTasks={stats.completed}
                totalTasks={stats.total}
                status={stats.status}
                onEdit={() => handleEdit(project)}
                onDelete={() => handleDelete(project._id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4 text-sm sm:text-base">
            No projects yet. Create your first project!
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-3 sm:px-0">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
              onClick={() => {
                setShowModal(false);
                setEditingProject(null);
              }}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-[#303030]">
              {editingProject ? "Update Project" : "Create New Project"}
            </h2>

            <div className="flex flex-col gap-3 sm:gap-4">
              <input
                type="text"
                name="title"
                placeholder="Enter project title"
                className="border border-[#e1e4e2] p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD75F] text-[#303030] placeholder-gray-400 text-sm sm:text-base"
                value={newProject.title}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Enter project description"
                className="border border-[#e1e4e2] p-2 sm:p-3 rounded-md h-20 sm:h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD75F] text-[#303030] placeholder-gray-400 text-sm sm:text-base"
                value={newProject.description}
                onChange={handleChange}
              />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="border border-[#e1e4e2] p-2 rounded-md w-full text-[#303030] text-sm sm:text-base"
                  >
                    {newProject.deadline
                      ? format(new Date(newProject.deadline), "PPP")
                      : "Pick a deadline"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={
                      newProject.deadline
                        ? new Date(newProject.deadline)
                        : undefined
                    }
                    onSelect={(date) => {
                      if (date) {
                        setNewProject({
                          ...newProject,
                          deadline: format(date, "yyyy-MM-dd"),
                        });
                      }
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2 sm:mt-4">
                <button
                  className="px-3 sm:px-4 py-2 rounded-md bg-gray-200 text-[#303030] font-medium hover:bg-gray-300 transition text-sm sm:text-base"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProject(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={isCreatingProject || isUpdatingProject}
                  className="px-3 sm:px-4 py-2 rounded-md bg-[#FFD75F] text-[#303030] font-semibold hover:brightness-95 shadow-md transition text-sm sm:text-base"
                  onClick={handleCreateOrUpdate}
                >
                  {isCreatingProject
                    ? "Creating..."
                    : isUpdatingProject
                    ? "Updating..."
                    : editingProject
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Projects;
