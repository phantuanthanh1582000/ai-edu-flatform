import React, { useState } from 'react';
import { Typography, message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomForm from '@/components/share/CustomForm';
import { login } from '@/services/api'; 
import { useAuth } from '@/global/AuthContext';
import '@/styles/login.style.scss';

const { Title } = Typography;

const Login = () => {
  const { onLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    login(values)
      .then((res) => {
        console.log('res', res);
        if (res.data?.code === 1) {
          const { user, token } = res.data.data; // ✅ lấy đúng dữ liệu từ API

          onLogin(user, token); // ✅ lưu vào context

          message.success('Đăng nhập thành công!');
          navigate('/');
        } else {
          message.error(res.data?.message || 'Đăng nhập thất bại!');
        }
      })
      .catch(() => {
        message.error('Đăng nhập thất bại!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fields = [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Nhập email',
      type: 'text',
      rules: [
        { required: true, message: 'Vui lòng nhập email!' },
        { type: 'email', message: 'Email không hợp lệ!' },
      ],
    },
    {
      name: 'password',
      label: 'Mật khẩu',
      placeholder: 'Nhập mật khẩu',
      type: 'password',
      rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }],
    },
  ];

  return (
    <div className="login-container">
      <Title level={2} className="login-title">🎓 PTT ACADEMY</Title>
      <Card className="login-card">
        <Title level={3} className="login-title">Đăng nhập</Title>
        <CustomForm
          fields={fields}
          onFinish={onFinish}
          loading={loading}
          submitText="Đăng nhập"
        />
        <div style={{ textAlign: 'center' }}>
          <span>Bạn chưa có tài khoản? </span>
          <a href="/register">Đăng ký ngay</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
