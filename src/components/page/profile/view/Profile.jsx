import React, { useState } from 'react';
import { Row, Col, Menu, Typography } from 'antd';
import {
  UserOutlined,
  HeartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import ProfileInfo from '../modal/ProfileInfo';
import FavoriteList from '../modal/FavoriteList';
import AccountSettings from '../modal/AccountSettings';
import '@/styles/profile.style.scss';

const { Title } = Typography;

const tabComponents = {
  info: <ProfileInfo />,
  favorites: <FavoriteList />,
  settings: <AccountSettings />,
};

const ProfilePage = () => {
  const [selectedKey, setSelectedKey] = useState('info');

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>👤 Trang cá nhân</Title>
      <Row gutter={24}>
        <Col xs={24} md={6}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
            items={[
              { key: 'info', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
              { key: 'favorites', icon: <HeartOutlined />, label: 'Đã thích' },
              { key: 'settings', icon: <SettingOutlined />, label: 'Cài đặt' },
            ]}
          />
        </Col>
        <Col xs={24} md={18}>
          {tabComponents[selectedKey]}
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
