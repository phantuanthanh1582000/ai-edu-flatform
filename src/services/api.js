import axiosInstance from './axiosInstance';

export const getProducts = () => {
  return axiosInstance.get('/api/v1/courses');
};
