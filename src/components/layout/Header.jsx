import React, { useState } from "react";
import { Layout, Menu, Dropdown, Drawer, Button, Grid } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DebounceSelect } from "@/components/share/DebounceSelect";
import { Courses } from "@/data/mockData";
import { useAuth } from "@/global/AuthContext";
import "@/styles/header.style.scss";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const HeaderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, onLogout } = useAuth();
  const screens = useBreakpoint();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const isMobile = !screens.lg;

  const handleNavigate = (path) => {
    navigate(path);
    setOpenDrawer(false);
  };

  const fetchCourseOptions = async (search) => {
    return Courses.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    ).map((c) => ({
      label: c.name,
      value: c.id,
    }));
  };

  const onSelectCourse = (course) => {
    setSelectedCourse(null);
    navigate("/coursedetail", { state: { courseId: course.value } });
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
    setOpenDrawer(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    window.messageApi?.warning("Vui lòng đăng nhập để sử dụng giỏ hàng!");
    handleNavigate("/login");
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
      if (key === "profile") handleNavigate("/profile");
      else if (key === "logout") handleLogout();
    },
  };

  const getMenuItems = () => {
    return [
      {
        key: "/",
        label: isMobile ? (
          <span onClick={() => handleNavigate("/")}>Trang chủ</span>
        ) : (
          <Link to="/">Trang chủ</Link>
        ),
      },
      {
        key: "/about",
        label: isMobile ? (
          <span onClick={() => handleNavigate("/about")}>Giới thiệu</span>
        ) : (
          <Link to="/about">Giới thiệu</Link>
        ),
      },
      {
        key: "/cart",
        label: user ? (
          <span onClick={() => handleNavigate("/cart")}>
            <ShoppingCartOutlined style={{ fontSize: 18 }} />
          </span>
        ) : (
          <a href="/login" onClick={handleCartClick}>
            <ShoppingCartOutlined style={{ fontSize: 18 }} />
          </a>
        ),
      },
      !user && {
        key: "/login",
        label: (
          <span onClick={() => handleNavigate("/login")}>
            Đăng nhập/Đăng ký
          </span>
        ),
      },
      user &&
        (!isMobile
          ? {
              key: "user",
              label: (
                <Dropdown menu={userMenu} placement="bottomRight" arrow>
                  <span style={{ cursor: "pointer" }}>👋 {user.name}</span>
                </Dropdown>
              ),
            }
          : {
              key: "profile",
              label: (
                <span onClick={() => handleNavigate("/profile")}>
                  👤 Trang cá nhân
                </span>
              ),
            }),
      user &&
        isMobile && {
          key: "logout",
          label: <span onClick={handleLogout}>🚪 Đăng xuất</span>,
        },
    ].filter(Boolean);
  };

  return (
    <Header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">🎓 PTT ACADEMY</Link>
        </div>
        <DebounceSelect
          className="search-course"
          placeholder="Tìm khoá học..."
          fetchOptions={fetchCourseOptions}
          onChange={onSelectCourse}
          value={selectedCourse}
        />
      </div>

      {!isMobile ? (
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={getMenuItems()}
          className="menu"
        />
      ) : (
        <>
          <Button
            icon={<MenuOutlined />}
            type="text"
            onClick={() => setOpenDrawer(true)}
            className="mobile-menu-btn"
          />
          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
          >
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]}
              items={getMenuItems()}
              onClick={() => setOpenDrawer(false)}
            />
          </Drawer>
        </>
      )}
    </Header>
  );
};

export default HeaderComponent;
