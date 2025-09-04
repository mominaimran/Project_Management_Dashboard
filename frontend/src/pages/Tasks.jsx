import React, { useEffect, useState } from "react";
import useTaskStore from "../store/useTaskStore";
import useProjectStore from "../store/useProjectStore";
import TasksList from "../components/TasksList";
import PushDropdown from "@/components/ui/pushDropDown";
import StatusDropdown from "@/components/ui/StatusDropdown";
import { Filter } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tasks = () => {
  const {
    error,
    createTask,
    getTasks,
    deleteTask,
    updateTask,
    tasks,
    isGettingTasks,
    isCreatingTask,
    selectedProject,
    setSelectedProject,
    selectedStatus,
    setSelectedStatus,
  } = useTaskStore();
  const { projects, getProjects } = useProjectStore();

  const [showModel, setShowModel] = useState(false);
  const [updatingTask, setUpdatingTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    project: selectedProject || "",
  });

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, project: selectedProject || "" }));
  }, [selectedProject]);

  useEffect(() => {
    getTasks();
  }, [selectedProject, selectedStatus, getTasks]);

  //backend error handling
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSave = async () => {
    // 🔹 Check required fields
    if (!form.title || !form.project) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      if (updatingTask) {
        await updateTask(updatingTask._id, form);
        toast.success("Task updated successfully");
      } else {
        await createTask(form);
        toast.success("Task created successfully");
      }

      // 🔹 Reset modal & form
      setShowModel(false);
      setUpdatingTask(null);
      await getTasks();
      setForm({
        title: "",
        description: "",
        status: "todo",
        project: selectedProject || "",
      });
    } catch {
      toast.error("Action failed. Try again!");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");
      await getTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = async (task) => {
    setUpdatingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      project: task.project?._id || "",
    });
    setShowModel(true);
  };

  return (
    <motion.div
      className="p-4 md:p-6 min-h-screen overflow-hidden rounded-xl"
      initial={{ x: "-20%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
    >
      {/* Header */}
      <header className="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#303030]">
            Tasks
          </h1>
          <p className="text-[#898A87] text-sm md:text-base">
            Manage your tasks effortlessly and stay ahead 🚀
          </p>
        </div>
        <button
          disabled={isCreatingTask}
          onClick={() => {
            if (!projects?.length) {
              toast.error("Create a project first!", {
                style: {
                  background: "#fff",
                  color: "#303030",
                  border: "1px solid #FFD75F",
                  padding: "12px",
                  borderRadius: "10px",
                },
              });
              return;
            }
            setShowModel(true);
          }}
          className={`px-4 md:px-5 py-2 rounded-xl font-semibold shadow-md transition text-sm md:text-base ${
            !projects?.length
              ? "bg-[#e1e4e2] text-[#898A87] cursor-not-allowed"
              : "bg-[#FFD75F] text-[#303030] hover:brightness-95"
          }`}
        >
          {isCreatingTask ? "Creating..." : "Create Task"}
        </button>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        {/* Project Filter */}
        <div className="flex flex-col flex-1 max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <Filter className="w-4 h-4 text-[#303030]" />
            <h3 className="font-medium text-sm text-[#303030]">
              Filter by Project
            </h3>
          </div>
          <PushDropdown
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </div>

        {/* Status Filter */}
        <div className="flex flex-col flex-1 max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <Filter className="w-4 h-4 text-[#303030]" />
            <h3 className="font-medium text-sm text-[#303030]">
              Filter by Status
            </h3>
          </div>
          <StatusDropdown
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
      </div>

      {/* No Tasks State */}
      {!isGettingTasks && tasks?.length === 0 && (
        <div className="mt-2 p-4 sm:p-6 border border-dashed border-gray-400 rounded-xl text-center text-gray-500 text-sm sm:text-base bg-btn/40">
          No tasks found.
        </div>
      )}

      {/* Task List */}
      <TasksList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />

      {/* Modal */}
      {showModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-[#898A87] hover:text-[#303030] transition text-lg"
              onClick={() => {
                setShowModel(false);
                setUpdatingTask(null);
                setForm({
                  title: "",
                  description: "",
                  status: "todo",
                  project: selectedProject || "",
                });
              }}
            >
              ✖
            </button>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-[#303030]">
              {updatingTask ? "Edit Task" : "Create Task"}
            </h2>

            {/* Form Fields */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border border-[#e1e4e2] p-2 sm:p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD75F] text-sm sm:text-base placeholder-[#898A87]"
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="border border-[#e1e4e2] p-2 sm:p-3 rounded-md h-20 sm:h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD75F] text-sm sm:text-base placeholder-[#898A87]"
              />

              {/* Status Selector */}
              <Select
                value={form.status}
                onValueChange={(value) => setForm({ ...form, status: value })}
              >
                <SelectTrigger className="w-full border border-[#e1e4e2] text-sm sm:text-base">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>

              {/* Project Selector */}
              <Select
                value={form.project}
                onValueChange={(value) => setForm({ ...form, project: value })}
              >
                <SelectTrigger className="w-full border border-[#e1e4e2] text-sm sm:text-base">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  {projects?.map((p) => (
                    <SelectItem key={p._id} value={p._id}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3 sm:mt-4">
                <button
                  className="px-3 py-2 rounded-md bg-[#e1e4e2] text-[#303030] font-medium hover:bg-[#d6d8d7] transition text-sm sm:text-base"
                  onClick={() => {
                    setShowModel(false);
                    setUpdatingTask(null);
                    setForm({
                      title: "",
                      description: "",
                      status: "todo",
                      project: selectedProject || "",
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-2 rounded-md bg-[#FFD75F] text-[#303030] font-semibold hover:brightness-95 shadow-md transition text-sm sm:text-base"
                  disabled={isCreatingTask}
                  onClick={handleSave}
                >
                  {updatingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Tasks;
