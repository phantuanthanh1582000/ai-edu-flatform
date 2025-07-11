import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';

import router from './router/router';
import { AuthProvider } from '@/global/AuthContext';
import '@/services/mockApi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/style.scss';

// Tạo App chính
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();

  window.messageApi = messageApi; 

  return (
    <ConfigProvider>
      {contextHolder}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
};

createRoot(document.getElementById('root')).render(<App />);
