import axios from "axios";
import { config } from "../constants/AppConstants";

const BASE_URL = config.url.API_URL;
const MAX_RETRIES = 2;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

axiosInstance.interceptors.request.use((requestConfig) => {
  const token = localStorage.getItem("token");

  if (token) {
    requestConfig.headers.Authorization = `bearer ${token}`;
  } else {
    delete requestConfig.headers.Authorization;
  }

  requestConfig.metadata = {
    retryCount: requestConfig.metadata?.retryCount || 0,
  };

  return requestConfig;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const requestConfig = error.config;
    const shouldRetry =
      requestConfig &&
      !error.response &&
      requestConfig.metadata?.retryCount < MAX_RETRIES;

    if (shouldRetry) {
      requestConfig.metadata.retryCount += 1;
      const waitTime = requestConfig.metadata.retryCount * 400;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return axiosInstance(requestConfig);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
