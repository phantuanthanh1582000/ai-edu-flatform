import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import HomePage from "../components/page/home/view/HomePage";
import Login from "@/components/page/login/view/Login";
import RegisterPage from "@/components/page/register/view/Register";
import FindPage from "@/components/page/find/view/Find";
import ProfilePage from "@/components/page/profile/view/Profile";
import CartPage from "@/components/page/cart/view/CartPage";
import CourseDetailPage from "@/components/page/detail/view/CourseDetailPage";
import MaintenancePage from "@/components/share/MaintenancePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <RegisterPage /> },
      { path: "find", element: <FindPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "coursedetail", element: <CourseDetailPage /> },
      { path: "about", element: <MaintenancePage /> },
      { path: "policy", element: <MaintenancePage /> },
      { path: "contact", element: <MaintenancePage /> },
      { path: "faq", element: <MaintenancePage /> },
      { path: "support", element: <MaintenancePage /> },
      { path: "feedback", element: <MaintenancePage /> },
    ],
  },
]);

export default router;
