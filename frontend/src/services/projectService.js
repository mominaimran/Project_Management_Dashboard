import apiClient from "./apiClient";

export const createProjectService = async (data) => {
  const res = await apiClient.post("/projects", data);
  return res.data;
};

export const getProjectsService = async () => {
  const res = await apiClient.get("/projects");
  return res.data;
};

export const getProjectService = async (id) => {
  const res = await apiClient.get(`/projects/${id}`);
  return res.data;
};

export const updateProjectService = async (id, data) => {
  const res = await apiClient.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProjectService = async (id) => {
  const res = await apiClient.delete(`/projects/${id}`);
  return res.data;
};
