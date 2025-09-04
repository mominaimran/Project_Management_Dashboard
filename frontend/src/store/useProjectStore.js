import { create } from "zustand";
import {
  createProjectService,
  getProjectsService,
  getProjectService,
  updateProjectService,
  deleteProjectService,
} from "../services/projectService";

const useProjectStore = create((set) => ({
  projects: null,
  project: null,
  error: null,
  isCreatingProject: false,
  isGettingProjects: false,
  isGettingProject: false,
  isUpdatingProject: false,
  isDeletingProject: false,

  clearError: () => set({ error: null }),

  createProject: async (data) => {
    set({ isCreatingProject: true, error: null });
    try {
      const { project } = await createProjectService(data);
      set((state) => ({
        projects: state.projects ? [project, ...state.projects] : [project],
        isCreatingProject: false,
      }));
      return { success: true, project }; // Return success flag
    } catch (error) {
      set({
        error: error.response?.data?.message || "Project creation failed",
        isCreatingProject: false,
      });
      return { success: false };
    }
  },

  getProjects: async () => {
    set({ isGettingProjects: true, error: null });
    try {
      const { projects } = await getProjectsService();
      set({ projects, isGettingProjects: false });
      return { success: true, projects };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Projects fetching failed",
        isGettingProjects: false,
      });
      return { success: false };
    }
  },

  getProject: async (id) => {
    set({ isGettingProject: true, error: null });
    try {
      const { project } = await getProjectService(id);
      set({ project, isGettingProject: false });
      return { success: true, project };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Project fetching failed",
        isGettingProject: false,
      });
      return { success: false };
    }
  },

  updateProject: async (id, data) => {
    set({ isUpdatingProject: true, error: null });
    try {
      const { project } = await updateProjectService(id, data);
      set((state) => ({
        projects: state.projects
          ? state.projects.map((p) => (p._id === id ? project : p))
          : [project],
        project,
        isUpdatingProject: false,
      }));
      return { success: true, project };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Project updating failed",
        isUpdatingProject: false,
      });
      return { success: false };
    }
  },

  deleteProject: async (id) => {
    set({ isDeletingProject: true, error: null });
    try {
      await deleteProjectService(id);
      set((state) => ({
        projects: state.projects
          ? state.projects.filter((p) => p._id !== id)
          : [],
        isDeletingProject: false,
      }));
      return { success: true, id };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Project deleting failed",
        isDeletingProject: false,
      });
      return { success: false };
    }
  },
}));

export default useProjectStore;
