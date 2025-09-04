import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // must for cookies
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
