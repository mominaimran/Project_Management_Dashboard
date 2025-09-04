import apiClient from "./apiClient";

export const createTaskService = async (data) => {
  const res = await apiClient.post("/tasks", data);
  return res.data;
};

export const getTasksService = async (projectId) => {
  const endpoint = projectId ? `/tasks?project=${projectId}` : `/tasks`;
  const res = await apiClient.get(endpoint);
  return res.data;
};

export const updateTaskService = async (id, data) => {
  const res = await apiClient.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTaskService = async (id) => {
  const res = await apiClient.delete(`/tasks/${id}`);
  return res.data;
};
