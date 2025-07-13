import MockAdapter from "axios-mock-adapter";
import axiosInstance from "./axiosInstance";
import { Courses, FeaturedTeachers, CourseDetails } from "@/data/mockData";

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

const parseBool = (val) => {
  if (typeof val === "boolean") return val;
  if (typeof val === "string") return val.toLowerCase() === "true";
  return null;
};

const mockUsers = [
  {
    id: "u1",
    email: "user@ptt.com",
    password: "123456",
    name: "User PTT",
    avatar: "https://i.pravatar.cc/150?u=user@ptt.com",
    role: "user",
    phone: "0909123456",
    gender: "male",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-05-20T12:00:00Z",
  },
];

mock.onPost("/api/v1/auth/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    return [
      200,
      {
        code: 1,
        message: "Đăng nhập thành công",
        data: {
          token: "fake-jwt-token",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            gender: user.gender,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      },
    ];
  }
  return [
    401,
    {
      code: 0,
      message: "Email hoặc mật khẩu không đúng!",
    },
  ];
});

mock.onGet("/api/v1/courses").reply((config) => {
  const params = config.params || {};
  const category = params.category?.toLowerCase();
  const subcategory = params.subcategory?.toLowerCase();
  const isAdvanced = parseBool(params.isAdvanced);
  const popular = parseBool(params.popular);
  const discountOnly = parseBool(params.discountOnly);
  const minPrice = parseInt(params.minPrice) || 0;
  const maxPrice = parseInt(params.maxPrice) || Infinity;
  const suggested = parseBool(params.suggested);
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 12;

  let filtered = Courses;

  if (suggested) {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const allIds = [...cart.map((c) => c.id), ...favorites];
      const matchedCourses = Courses.filter((c) => allIds.includes(c.id));
      const subcategories = [
        ...new Set(matchedCourses.map((c) => c.subcategory).filter(Boolean)),
      ];
      if (subcategories.length > 0) {
        filtered = Courses.filter((c) => subcategories.includes(c.subcategory));
      }
    } catch (e) {
      console.warn("Lỗi khi lấy dữ liệu từ localStorage:", e);
    }
  }

  if (category) {
    filtered = filtered.filter((c) => c.category?.toLowerCase() === category);
    if (subcategory) {
      filtered = filtered.filter(
        (c) => c.subcategory?.toLowerCase() === subcategory
      );
    }
  }

  if (isAdvanced !== null) {
    filtered = filtered.filter((c) => c.isAdvanced === isAdvanced);
  }

  if (popular !== null) {
    filtered = filtered.filter((c) => c.popular === popular);
  }

  if (discountOnly !== null) {
    filtered = filtered.filter((c) => !!c.discountPrice === discountOnly);
  }

  filtered = filtered.filter((c) => {
    const price = c.discountPrice || c.price;
    return price >= minPrice && price <= maxPrice;
  });

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filtered.slice(start, end);

  return [
    200,
    {
      code: 1,
      message: "Lấy danh sách khóa học thành công",
      data: paginatedData,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  ];
});

mock.onGet("/api/v1/teachers").reply(() => {
  return [
    200,
    {
      code: 1,
      message: "Lấy danh sách giảng viên thành công",
      data: FeaturedTeachers,
    },
  ];
});

mock.onGet("/api/v1/favorites").reply((config) => {
  const ids = config.params?.ids || [];
  const page = parseInt(config.params?.page || 1);
  const limit = parseInt(config.params?.limit || 8);
  const matched = Courses.filter((course) => ids.includes(course.id));
  const total = matched.length;
  const startIndex = (page - 1) * limit;
  const paginatedData = matched.slice(startIndex, startIndex + limit);

  return [
    200,
    {
      code: 1,
      message: "Lấy danh sách khóa học thành công",
      data: paginatedData,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    },
  ];
});

mock.onGet("/api/v1/cart").reply((config) => {
  const ids = config.params?.ids || [];
  const matched = Courses.filter((course) => ids.includes(course.id));
  return [
    200,
    {
      code: 1,
      message: "Lấy danh sách giỏ hàng thành công",
      data: matched,
    },
  ];
});

mock.onGet("/api/v1/detail").reply((config) => {
  const id = config.params?.id;
  const course = Courses.find((c) => c.id === id);
  const detail = CourseDetails.find((d) => d.courseId === id);

  if (course && detail) {
    return [
      200,
      {
        code: 1,
        message: "Lấy chi tiết khóa học thành công",
        data: {
          ...course,
          ...detail,
        },
      },
    ];
  }

  return [
    404,
    {
      code: 0,
      message: "Không tìm thấy khóa học",
    },
  ];
});

mock.onGet("/api/v1/courses/by-ids").reply((config) => {
  // Lấy danh sách id từ query param dạng mảng ids[]
  const ids = config.params?.ids || [];

  // Lọc ra danh sách khóa học có id nằm trong mảng ids
  const matched = Courses.filter((course) => ids.includes(course.id));

  return [
    200,
    {
      code: 1,
      message: "Lấy danh sách khóa học theo ids thành công",
      data: matched,
    },
  ];
});
