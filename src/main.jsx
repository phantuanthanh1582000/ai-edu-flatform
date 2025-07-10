import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@/services/mockApi';
import router from './router/router';
import { AuthProvider } from '@/global/AuthContext'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/style.scss';

createRoot(document.getElementById('root')).render(
  <AuthProvider> 
    <RouterProvider router={router} />
  </AuthProvider>
);
