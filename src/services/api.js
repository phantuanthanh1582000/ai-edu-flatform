import axiosInstance from './axiosInstance';

export const getCourses = (params = {}) => {
  return axiosInstance.get('/api/v1/courses', { params });
};

export const getTeachers = () => {
  return axiosInstance.get('/api/v1/teachers');
};

export const login = (data) => {
  return axiosInstance.post('/api/v1/auth/login', data);
};

export const getFavorites = (ids = []) => {
  return axiosInstance.get('/api/v1/favorites', {
    params: { ids },
  });
};

