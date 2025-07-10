import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@/services/mockApi'
import router from './router/router'; 
import '@/styles/style.scss'

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
