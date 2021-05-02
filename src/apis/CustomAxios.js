import axios from 'axios';
import { getUserFromLocalStorage } from 'utilities/utilities';

let axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API + '/api/v1',
});

axiosInstance.interceptors.request.use( function (config) {
    const user = getUserFromLocalStorage();
    config.headers.Authorization = user ?  `Bearer ${user.token}`: '';
    return config
});


export default axiosInstance;