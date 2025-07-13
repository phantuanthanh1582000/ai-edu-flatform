import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import HomePage from "../components/page/home/view/HomePage";
import Login from "@/components/page/login/view/Login";
import FindPage from "@/components/page/find/view/Find";
import ProfilePage from "@/components/page/profile/view/Profile";
import CartPage from "@/components/page/cart/view/CartPage";
import CourseDetailPage from "@/components/page/detail/view/CourseDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "find", element: <FindPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "coursedetail", element: <CourseDetailPage /> },
    ],
  },
]);

export default router;
