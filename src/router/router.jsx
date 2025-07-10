import { createBrowserRouter } from 'react-router-dom';
import UserLayout from '../components/layout/UserLayout';
import HomePage from '../components/page/home/view/HomePage';
import Login from '@/components/page/login/view/Login';
import FindPage from '@/components/page/find/view/Find';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <Login /> },
      { path: 'find', element: <FindPage /> }, 
    ],
  },
]);

export default router;
