import axios from "axios";
import LocalStorage from "./local-storage";

const LOCAL_IP = "192.168.1.16";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:3000";
    } else {
      return `http://${LOCAL_IP}:3000`;
    }
  }
  return "http://localhost:3000";
};

const api = axios.create({
  baseURL: process.env.API_URL_AUTH || `${getBaseUrl()}/api/auth`,
});

const api_dashboard = axios.create({
  baseURL: process.env.API_URL_DASHBOARD || `${getBaseUrl()}/api/dashboard`,
});

const api_post = axios.create({
  baseURL: process.env.API_URL_POST || `${getBaseUrl()}/api/post`,
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
