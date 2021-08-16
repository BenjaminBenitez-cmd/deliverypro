import axios from "axios";
import config from "../config";

const axiosInstance = axios.create({
  baseURL: config.URL,
});

const signin = (values) => axiosInstance.post("/signin", values);

const signup = (values) => axiosInstance.post("/signup", values);

const signupAuth = (token) => {
  axiosInstance.post(
    "/authenticate",
    {},
    {
      headers: {
        token: token,
      },
    }
  );
};

const forgotPassword = (values) =>
  axiosInstance.post("/forgotpassword", values);

const resetpassword = (values, token) =>
  axiosInstance.post("/resetpassword", values, {
    headers: { Authorization: `Bearer ${token}` },
  });

const AuthRequests = {
  signin,
  signup,
  signupAuth,
  forgotPassword,
  resetpassword,
};

export default AuthRequests;
