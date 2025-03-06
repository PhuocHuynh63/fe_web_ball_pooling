import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api/v1",
  baseURL: "https://swd392sp25.com:8000/api/v1",


});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;