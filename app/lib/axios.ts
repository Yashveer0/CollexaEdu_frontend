import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
});

// 🔐 REQUEST INTERCEPTOR
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("collexa_token");

    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
