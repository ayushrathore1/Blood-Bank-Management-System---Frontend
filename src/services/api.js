import axios from "axios";
import { tokenManager } from "../utils/tokenManager";

const API_URL = import.meta.env.VITE_API_URL || "https://blood-bank-management-system-backend-1z5k.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenManager.clearAll();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
