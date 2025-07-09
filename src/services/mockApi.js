import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '@/services/axiosInstance';
import { Courses } from '@/data/mockData';

const mock = new MockAdapter(axiosInstance, { delayResponse: 800 });

mock.onGet('/api/v1/courses').reply(200, {
  code: 1,
  message: 'Lấy danh sách thành công',
  data: Courses.filter(c => c.category === 'frontend')
});

export default mock;
