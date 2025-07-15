import React from "react";
import { Typography, Card } from "antd";
import CustomForm from "@/components/share/CustomForm";
import useLogin from "../hook/useLogin";
import "@/styles/login.style.scss";

const { Title } = Typography;

const Login = () => {
  const { loading, onFinish } = useLogin();

  const fields = [
    {
      name: "email",
      label: "Email",
      placeholder: "Nhập email",
      type: "text",
      rules: [
        { required: true, message: "Vui lòng nhập email!" },
        { type: "email", message: "Email không hợp lệ!" },
      ],
    },
    {
      name: "password",
      label: "Mật khẩu",
      placeholder: "Nhập mật khẩu",
      type: "password",
      rules: [{ required: true, message: "Vui lòng nhập mật khẩu!" }],
    },
  ];

  const initialValues = {
    email: "user@ptt.com",
    password: "123456",
  };

  return (
    <div className="login-container">
      <Title level={2} className="login-title">
        🎓 PTT ACADEMY
      </Title>
      <Card
        className="login-card"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>Đăng nhập</Title>
          </div>
        }
      >
        <CustomForm
          fields={fields}
          onFinish={onFinish}
          loading={loading}
          submitText="Đăng nhập"
          initialValues={initialValues}
        />
        <div className="login-footer">
          <span>Bạn chưa có tài khoản? </span>
          <a href="/register">Đăng ký ngay</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
