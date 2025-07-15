import React, { useState } from "react";
import { Layout, Menu, Dropdown, Drawer, Button, Grid, Avatar } from "antd";
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
  const [menuKey, setMenuKey] = useState(Date.now()); // ✅ Key để force remount Menu

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
    setMenuKey(Date.now());
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
    const items = [
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
        label: (
          <span
            onClick={
              user
                ? () => handleNavigate("/cart")
                : (e) => {
                    e.preventDefault();
                    handleCartClick(e);
                  }
            }
          >
            Giỏ hàng
          </span>
        ),
      },
    ];

    if (!user) {
      items.push({
        key: "/login",
        label: (
          <span onClick={() => handleNavigate("/login")}>
            Đăng nhập/Đăng ký
          </span>
        ),
      });
    }

    return items;
  };

  return (
    <Header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">{isMobile ? "🎓" : "🎓 PTT ACADEMY"}</Link>
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
        <div className="header-right">
          <div className="menu-wrapper">
            <Menu
              key={menuKey} // ✅ Gán key để Menu re-render khi cần
              theme="light"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={getMenuItems()}
              className="menu"
            />
            {user && (
              <Dropdown menu={userMenu} placement="bottomRight" arrow>
                <span className="user-dropdown">
                  <Avatar src={user.avatar} size="small" />
                  <span style={{ marginLeft: 8 }}>{user.name}</span>
                </span>
              </Dropdown>
            )}
          </div>
        </div>
      ) : (
        <>
          <Button
            type="text"
            onClick={() => setOpenDrawer(true)}
            className="mobile-menu-btn"
          >
            {user ? (
              <Avatar size="large" src={user.avatar}>
                {user.name?.charAt(0)}
              </Avatar>
            ) : (
              <MenuOutlined />
            )}
          </Button>

          <Drawer
            title="Menu"
            placement="right"
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
          >
            <Menu
              mode="vertical"
              selectedKeys={[location.pathname]}
              items={[
                ...getMenuItems(),
                user && {
                  key: "profile",
                  label: (
                    <span onClick={() => handleNavigate("/profile")}>
                      Trang cá nhân
                    </span>
                  ),
                },
                user && {
                  key: "logout",
                  label: <span onClick={handleLogout}>Đăng xuất</span>,
                },
              ].filter(Boolean)}
              onClick={() => setOpenDrawer(false)}
            />
          </Drawer>
        </>
      )}
    </Header>
  );
};

export default HeaderComponent;
