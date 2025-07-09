import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '@/services/axiosInstance';

const mock = new MockAdapter(axiosInstance, { delayResponse: 800 });

mock.onGet('/api/v1/products').reply(200, {
  code: 1,
  message: 'Lấy danh sách thành công',
  data: [
    {
      id: 'p1',
      name: 'Khoá học React căn bản',
      price: 499000,
      image: '/assets/react.jpg',
      shortDesc: 'Học React từ con số 0',
    },
    {
      id: 'p2',
      name: 'Tiếng Anh giao tiếp',
      price: 850000,
      image: '/assets/english.jpg',
      shortDesc: 'Luyện nói với người bản xứ',
    },
    {
      id: 'p3',
      name: 'Lập trình Web Fullstack',
      price: 1200000,
      image: '/assets/fullstack.jpg',
      shortDesc: 'Frontend + Backend + Database',
    },
  ],
});

export default mock;
