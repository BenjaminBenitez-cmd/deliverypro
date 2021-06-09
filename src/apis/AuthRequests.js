import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

const signin = (values) => axiosInstance.post("/signin", values);

const AuthRequests = {
  signin,
};

export default AuthRequests;
