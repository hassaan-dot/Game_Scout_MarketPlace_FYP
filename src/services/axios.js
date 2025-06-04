import axios from "axios";
import LocalStorage from "./local-storage";

const api = axios.create({
  baseURL: process.env.API_URL_AUTH || "http://localhost:3000/api/auth",
});

const api_dashboard = axios.create({
  baseURL:
    process.env.API_URL_DASHBOARD || "http://localhost:3000/api/dashboard",
});
const api_post = axios.create({
  baseURL: process.env.API_URL_Post || "http://localhost:3000/api/post",
});

const attachTokenInterceptor = (instance) => {
  instance.interceptors.request.use(
    async (config) => {
      const token = await LocalStorage.get("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Accept = "multipart/form-data";
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

attachTokenInterceptor(api);
attachTokenInterceptor(api_dashboard);
attachTokenInterceptor(api_post);

export { api, api_dashboard, api_post };
