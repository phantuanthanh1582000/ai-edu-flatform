import React from 'react';
import { Card, Typography, Avatar } from 'antd';

const { Title, Paragraph } = Typography;

const TeacherCard = ({ name, image, title, description }) => {
  return (
    <Card
      hoverable
      style={{
        width: 280,
        minHeight: 320,
        margin: '0 auto',
        borderRadius: 12,
        transition: 'all 0.3s ease',
      }}
      styles={{ body:{ padding: 16, textAlign: 'center' }}}
    >
      <Avatar
        src={image}
        alt={name}
        size={150}
        style={{ marginBottom: 16 }}
      />
      <Title level={4} style={{ marginBottom: 4 }}>{name}</Title>
      <Paragraph style={{ margin: 0, fontWeight: 500 }}>{title}</Paragraph>
      <Paragraph style={{ fontSize: 13, color: '#555' }}>{description}</Paragraph>
    </Card>
  );
};

export default TeacherCard;
