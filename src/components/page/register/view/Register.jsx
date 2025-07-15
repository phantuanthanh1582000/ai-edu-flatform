import React from "react";
import { Card, Typography } from "antd";
import useRegister from "../hook/useRegister";
import CustomForm from "@/components/share/CustomForm";
import "@/styles/register.style.scss";

const { Title } = Typography;

const RegisterPage = () => {
  const { handleSubmit } = useRegister();

  const fields = [
    {
      name: "fullname",
      label: "Họ tên",
      rules: [{ required: true, message: "Vui lòng nhập họ tên!" }],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      rules: [
        { required: true, message: "Vui lòng nhập email!" },
        { type: "email", message: "Email không hợp lệ!" },
      ],
    },
    {
      name: "phone",
      label: "Số điện thoại",
      rules: [
        { required: true, message: "Vui lòng nhập số điện thoại!" },
        {
          pattern: /^[0-9]{9,11}$/,
          message: "Số điện thoại không hợp lệ!",
        },
      ],
    },
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      rules: [{ required: true, message: "Vui lòng nhập mật khẩu!" }],
    },
    {
      name: "confirmPassword",
      label: "Nhập lại mật khẩu",
      type: "password",
      dependencies: ["password"],
      rules: [
        { required: true, message: "Vui lòng nhập lại mật khẩu!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Mật khẩu không khớp!"));
          },
        }),
      ],
    },
    {
      name: "agree",
      label: "Tôi đồng ý với điều khoản và chính sách",
      type: "checkbox",
      rules: [
        {
          validator: (_, value) =>
            value
              ? Promise.resolve()
              : Promise.reject("Bạn phải đồng ý với điều khoản!"),
        },
      ],
    },
  ];

  return (
    <div className="register-page">
      <Title level={2} className="academy-title">
        🎓 PTT ACADEMY
      </Title>
      <Card
        className="register-card"
        title={
          <div>
            <Title level={3}>Đăng ký tài khoản</Title>
          </div>
        }
        bordered={false}
      >
        <CustomForm
          fields={fields}
          onFinish={handleSubmit}
          submitText="Đăng ký"
          loading={false}
        />
      </Card>
    </div>
  );
};

export default RegisterPage;
