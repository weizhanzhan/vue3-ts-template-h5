import axios from "axios";
const baseURL = "http://localhost:8080/api";
const requestTimeout = 10000;
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    const { response } = error;
    if (response && response.data) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
