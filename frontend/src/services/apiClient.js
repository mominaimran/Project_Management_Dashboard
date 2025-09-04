import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://projectmanagementdashboard-production.up.railway.app"
    : "http://localhost:5001/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
