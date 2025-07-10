import MockAdapter from 'axios-mock-adapter';
import axiosInstance from './axiosInstance';

import { Courses, FeaturedTeachers } from '@/data/mockData';

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

const parseBool = (val) => {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') return val.toLowerCase() === 'true';
  return null;
};

const mockUsers = [
  {
    email: 'user@ptt.com',
    password: '123456',
    name: 'User PTT',
    role: 'user',
  },
];

// 👉 API login
mock.onPost('/api/v1/auth/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);

  const user = mockUsers.find((u) => u.email === email && u.password === password);

  if (user) {
    return [
      200,
      {
        code: 1,
        message: 'Đăng nhập thành công',
        data: {
          token: 'fake-jwt-token',
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      },
    ];
  }

  return [
    401,
    {
      code: 0,
      message: 'Email hoặc mật khẩu không đúng!',
    },
  ];
});

mock.onGet('/api/v1/courses').reply((config) => {
  const params = config.params || {};
  const category = params.category?.toLowerCase();
  const isAdvanced = parseBool(params.isAdvanced);
  const popular = parseBool(params.popular);
  const discountOnly = parseBool(params.discountOnly);
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 12;

  console.log('🔥 Mock gọi với:', { category, isAdvanced, popular, discountOnly, page, limit });

  let filtered = Courses;

  // Lọc theo category
  if (category) {
    filtered = filtered.filter((c) => c.category?.toLowerCase() === category);
  }

  // Lọc theo isAdvanced
  if (isAdvanced !== null) {
    filtered = filtered.filter((c) => c.isAdvanced === isAdvanced);
  }

  // Lọc theo popular
  if (popular !== null) {
    filtered = filtered.filter((c) => c.popular === popular);
  }

  // Lọc theo discountOnly
  if (discountOnly !== null) {
    filtered = filtered.filter((c) => !!c.discountPrice === discountOnly);
  }

  // Tính toán phân trang
  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filtered.slice(start, end);

  return [
    200,
    {
      code: 1,
      message: 'Lấy danh sách khóa học thành công',
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


// 🎯 Mock API lấy danh sách giảng viên
mock.onGet('/api/v1/teachers').reply(() => {
  console.log('👨‍🏫 Mock API: Lấy danh sách giảng viên');
  return [
    200,
    {
      code: 1,
      message: 'Lấy danh sách giảng viên thành công',
      data: FeaturedTeachers,
    },
  ];
});
