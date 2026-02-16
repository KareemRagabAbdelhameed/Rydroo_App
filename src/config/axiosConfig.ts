import axios from "axios";
import i18n from "i18next";

const api = axios.create({
  // baseURL: "http://localhost:5000/",
   baseURL: "https://rydroo-app-backend.onrender.com/",
  withCredentials : true,
});

api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language;
  return config;
});

export default api;
