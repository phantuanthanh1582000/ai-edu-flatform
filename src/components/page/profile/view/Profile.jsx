import React, { useState } from "react";
import { Row, Col, Menu, Typography, Drawer, Button, Grid } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import ProfileInfo from "../modal/ProfileInfo";
import FavoriteList from "../modal/FavoriteList";
import AccountSettings from "../modal/AccountSettings";
import "@/styles/profile.style.scss";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const tabComponents = {
  info: <ProfileInfo />,
  favorites: <FavoriteList />,
  settings: <AccountSettings />,
};

const ProfilePage = () => {
  const [selectedKey, setSelectedKey] = useState("info");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    if (isMobile) setDrawerVisible(false);
  };

  const menuItems = [
    {
      key: "info",
      icon: <UserOutlined />,
      label: "Thông tin cá nhân",
    },
    {
      key: "favorites",
      icon: <HeartOutlined />,
      label: "Đã thích",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
    },
  ];

  return (
    <div className="profile-page">
      <Title level={2}>Trang cá nhân</Title>
      {isMobile && (
        <Button
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Menu
        </Button>
      )}

      <Row gutter={24}>
        {!isMobile && (
          <Col md={4}>
            <Menu
              className="custom-profile-menu"
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              items={menuItems}
            />
          </Col>
        )}

        <Col xs={24} md={20} className="content-profile">
          {tabComponents[selectedKey]}
        </Col>
      </Row>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </Drawer>
    </div>
  );
};

export default ProfilePage;
