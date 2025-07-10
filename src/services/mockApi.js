import MockAdapter from 'axios-mock-adapter';
import axiosInstance from './axiosInstance'; 

import { Courses } from '@/data/mockData';

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

mock.onGet('/api/v1/courses').reply((config) => {
  const category = config.params?.category?.toLowerCase(); 

  console.log('🔥 Mock API được gọi với category:', category);

  const filtered = category
    ? Courses.filter(c => c.category.toLowerCase() === category)
    : Courses;

  return [
    200,
    {
      code: 1,
      message: 'Lấy danh sách thành công',
      data: filtered,
    },
  ];
});

