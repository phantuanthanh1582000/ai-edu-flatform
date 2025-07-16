import axiosInstance from "./axiosInstance";

export const getCourses = (params = {}) => {
  return axiosInstance.get("/api/v1/courses", { params });
};

export const getTeachers = () => {
  return axiosInstance.get("/api/v1/teachers");
};

export const login = (data) => {
  return axiosInstance.post("/api/v1/auth/login", data);
};

export const getFavorites = (ids, page = 1, limit = 8) => {
  return axiosInstance.get("/api/v1/favorites", {
    params: {
      ids,
      page,
      limit,
    },
  });
};

export const getCartItems = (ids) => {
  return axiosInstance.get("/api/v1/cart", {
    params: { ids },
  });
};

export const getCourseDetail = (id) => {
  return axiosInstance.get("/api/v1/detail", {
    params: { id },
  });
};

export const getCoursesByIds = (ids) => {
  return axiosInstance.get("/api/v1/courses/by-ids", {
    params: { ids },
  });
};

export const getReviewsByCourseId = (courseId) => {
  return axiosInstance.get("/api/v1/reviews", {
    params: { courseId },
  });
};

export const saveReview = (review) => {
  return axiosInstance.post("/api/v1/reviews", review);
};
