import React, { useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { DebounceSelect } from "@/components/share/DebounceSelect";
import { Courses } from "@/data/mockData";
import { useAuth } from "@/global/AuthContext";
import "@/styles/header.style.scss";

const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, onLogout } = useAuth();

  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourseOptions = async (search) => {
    return Courses.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    ).map((cat) => ({
      label: cat.name,
      value: cat.id,
    }));
  };

  const onSelectCourse = (course) => {
    setSelectedCourse(null);
    navigate("/coursedetail", { state: { courseId: course.value } });
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    window.messageApi?.warning("Vui lòng đăng nhập để sử dụng giỏ hàng!");
    navigate("/login");
  };

  const userMenu = {
    items: [
      {
        key: "profile",
        label: "Trang cá nhân",
        icon: <UserOutlined />,
      },
      {
        key: "logout",
        label: "Đăng xuất",
        icon: <LogoutOutlined />,
      },
    ],
    onClick: ({ key }) => {
      if (key === "profile") {
        navigate("/profile");
      } else if (key === "logout") {
        handleLogout();
      }
    },
  };

  const menuItems = [
    {
      key: "/",
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: "/about",
      label: <Link to="/about">Giới thiệu</Link>,
    },
    {
      key: "/cart",
      label: user ? (
        <Link to="/cart">
          <ShoppingCartOutlined style={{ fontSize: 18 }} />
        </Link>
      ) : (
        <a href="/login" onClick={handleCartClick}>
          <ShoppingCartOutlined style={{ fontSize: 18 }} />
        </a>
      ),
    },
    !user && {
      key: "/login",
      label: <Link to="/login">Đăng nhập/Đăng ký</Link>,
    },
    user && {
      key: "user",
      label: (
        <Dropdown menu={userMenu} placement="bottomRight" arrow>
          <span style={{ cursor: "pointer" }}>👋 {user.name}</span>
        </Dropdown>
      ),
    },
  ].filter(Boolean);

  return (
    <Header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">🎓 PTT ACADEMY</Link>
        </div>
        <DebounceSelect
          placeholder="Tìm khoá học..."
          fetchOptions={fetchCourseOptions}
          onChange={onSelectCourse}
          value={selectedCourse}
          style={{ width: 500, height: 40 }}
        />
      </div>

      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="menu"
      />
    </Header>
  );
};

export default HeaderComponent;
