import apiClient from "./apiClient";

export const signupUser = async (data) => {
  const res = await apiClient.post("/auth/signup", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await apiClient.post("/auth/login", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await apiClient.post("/auth/logout");
  return res.data;
};

export const checkAuth = async () => {
  const res = await apiClient.get("/auth/checkAuth");
  return res.data;
};
