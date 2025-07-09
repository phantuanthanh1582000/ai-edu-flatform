import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import '@/styles/login.style.scss';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // Fake login simulation
    setTimeout(() => {
      setLoading(false);
      message.success('Đăng nhập thành công!');
      navigate('/'); // điều hướng về trang chủ
    }, 1000);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={3} className="login-title">Đăng nhập</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
