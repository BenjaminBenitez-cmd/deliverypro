import axios from "axios";
import config from "../config";

const axiosInstance = axios.create({
  baseURL: config.url,
});

const signin = (values) => axiosInstance.post("/signin", values);

const signup = (values) => axiosInstance.post("/signup", values);

const signupAuth = (token) =>
  axiosInstance.post(
    "/authenticate",
    {},
    {
      headers: {
        token: token,
      },
    }
  );

const AuthRequests = {
  signin,
  signup,
  signupAuth,
};

export default AuthRequests;
