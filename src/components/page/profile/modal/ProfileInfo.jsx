import React from 'react';
import { Card, Row, Col, Avatar, Typography, Descriptions, Divider, Tag } from 'antd';
import { useAuth } from '@/global/AuthContext';

const { Title, Text } = Typography;

const ProfileInfo = () => {
  const { user } = useAuth();

  return (
    <Card>
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
          <Avatar
            size={120}
            src={user?.avatar}
            icon={!user?.avatar && <Text>{user?.name?.[0]?.toUpperCase()}</Text>}
            style={{ marginBottom: 12 }}
          />
          <Title level={4}>{user?.name}</Title>
          {user?.role && (
            <Tag
              style={{
                backgroundColor: '#52c41a', 
                color: 'white',              
                fontSize: 14,
                padding: '2px 10px',
                border: 'none',
              }}
            >
              {user.role.toUpperCase()}
            </Tag>
          )}
        </Col>

        <Col xs={24} sm={16}>
          <Divider orientation="left">Thông tin chi tiết</Divider>
          <Descriptions column={1} labelStyle={{ fontWeight: 600 }} size="small">
            <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{user?.phone || 'Chưa cập nhật'}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{user?.address || 'Chưa cập nhật'}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{user?.gender || 'Không rõ'}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileInfo;
