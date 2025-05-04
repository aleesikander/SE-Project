// src/api.js
import axios from "axios";

// Create axios instance without store dependency
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://se-project-25j3.onrender.com/api",
  withCredentials: true,
});

// Request interceptor (no store dependency)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setupResponseInterceptor = (store) => {
  // Response interceptor (with store dependency)
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        store.dispatch(logout());
        window.location.href = "/login";
      }

      // Return consistent error format
      return Promise.reject({
        message: error.response?.data?.message || "An error occurred",
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  );
};

export default api;
