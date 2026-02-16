import axios from "axios";
// import i18n from "i18next";

const api = axios.create({
  // baseURL: "http://localhost:5000/",
   baseURL: "https://rydroo-app-backend.onrender.com/",
  withCredentials : true,
  //  headers: {
  //   lang: i18n.language
  // }
});

export default api;
