import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

const { Content, Footer } = Layout;

const UserLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <Content>
        <Outlet />
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default UserLayout;
