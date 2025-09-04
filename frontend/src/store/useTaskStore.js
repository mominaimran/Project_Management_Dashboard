import { create } from "zustand";
import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskService";

const useTaskStore = create((set, get) => ({
  tasks: null,
  task: null,
  selectedProject: null,
  selectedStatus: null,
  error: null,
  isCreatingTask: false,
  isGettingTasks: false,
  isUpdatingTask: false,
  isDeletingTask: false,

  setSelectedProject: (projectId) => set({ selectedProject: projectId }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),

  createTask: async (data) => {
    set({ isCreatingTask: true, error: null });
    try {
      const { task } = await createTaskService(data);
      set((state) => ({
        tasks: state.tasks ? [...state.tasks, task] : [task],
        isCreatingTask: false,
      }));
      return task;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Task creation failed",
        isCreatingTask: false,
      });
    }
  },

  getTasks: async (opts = {}) => {
    const { bypassFilters = false, projectId } = opts;

    set({ isGettingTasks: true, error: null });
    try {
      const state = get();

      const projectParam = bypassFilters
        ? null
        : projectId ?? state.selectedProject;

      const { tasks } = await getTasksService(projectParam); 
      
      const finalTasks = bypassFilters
        ? tasks
        : state.selectedStatus
        ? tasks.filter((t) => t.status === state.selectedStatus)
        : tasks;

      set({ tasks: finalTasks, isGettingTasks: false });
      return finalTasks;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Tasks fetching failed",
        isGettingTasks: false,
      });
      return [];
    }
  },

  updateTask: async (id, data) => {
    set({ isUpdatingTask: true, error: null });
    try {
      const { task } = await updateTaskService(id, data);
      set((state) => ({
        tasks: state.tasks
          ? state.tasks.map((t) => (t._id === id ? task : t))
          : [task],
        task,
        isUpdatingTask: false,
      }));
      return task;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Task updating failed",
        isUpdatingTask: false,
      });
    }
  },

  deleteTask: async (id) => {
    set({ isDeletingTask: true, error: null });
    try {
      await deleteTaskService(id);
      set((state) => ({
        tasks: state.tasks ? state.tasks.filter((t) => t._id !== id) : [],
        isDeletingTask: false,
      }));
      return id; // useful for UI
    } catch (error) {
      set({
        error: error.response?.data?.message || "Task deleting failed",
        isDeletingTask: false,
      });
    }
  },
}));

export default useTaskStore;
