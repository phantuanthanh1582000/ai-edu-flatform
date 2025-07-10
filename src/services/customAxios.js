import axios from 'axios';

const createInstanceAxios = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL || 'http://localhost:3000', 
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createInstanceAxios;
