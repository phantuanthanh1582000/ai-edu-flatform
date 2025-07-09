import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '', 
  timeout: 3000,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
