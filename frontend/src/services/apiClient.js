import axios from "axios";

const BASE_URL = "https://projectmanagementdashboard-production.up.railway.app/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
