// import axios from "axios";
// import { config } from "../constants/AppConstants";

// const token = localStorage.getItem('token');
// const BASE_URL = config.url.API_URL;
// axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

// export default axios;

import axios from "axios";
import { config } from "../constants/AppConstants";

const BASE_URL = config.url.API_URL;

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

  return requestConfig;
});

export default axiosInstance;
