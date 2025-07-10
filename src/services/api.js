import axiosInstance from './axiosInstance';

export const getCourses = (params = {}) => {
  return axiosInstance.get('/api/v1/courses', { params });
};
