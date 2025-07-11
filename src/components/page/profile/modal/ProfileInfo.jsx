import React from 'react';
import { Card } from 'antd';
import { useAuth } from '@/global/AuthContext';

const ProfileInfo = () => {
  const { user } = useAuth();

  return (
    <Card title="Thông tin cá nhân">
      <p><strong>Họ tên:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Username:</strong> {user?.username}</p>
    </Card>
  );
};

export default ProfileInfo;
