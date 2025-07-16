import axios from "axios";

const createInstanceAxios = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL || "https://api.pttacademy.com",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
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
