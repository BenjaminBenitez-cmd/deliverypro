import axios from "axios";
import { getUserFromLocalStorage } from "utilities/utilities";
import config from "../config";

let axiosInstance = axios.create({
  baseURL: config.URL + "/api/v1",
});

axiosInstance.interceptors.request.use(function (config) {
  const user = getUserFromLocalStorage();
  config.headers.Authorization = user ? `Bearer ${user.token}` : "";
  return config;
});

export default axiosInstance;
