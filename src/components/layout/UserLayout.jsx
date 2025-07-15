import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderComponent from "./header/Header";
import FooterComponent from "./footer/Footer";

const { Content } = Layout;

const UserLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Content>
        <Outlet />
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default UserLayout;
