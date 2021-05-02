import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API,
});

const signinUserRequest = (values) => axiosInstance.post('/signin', values);

const AuthRequests = {
    signinUserRequest
}

export default AuthRequests;
