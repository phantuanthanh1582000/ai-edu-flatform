import React from "react";
import { Card, Typography, Avatar } from "antd";

const { Title, Paragraph } = Typography;

const TeacherCard = ({ name, image, title, description }) => {
  return (
    <Card
      hoverable
      className="teacher-card"
      styles={{ body: { padding: 16, textAlign: "center" } }}
    >
      <Avatar src={image} alt={name} size={150} className="teacher-avatar" />
      <Title level={4} className="teacher-name">
        {name}
      </Title>
      <Paragraph className="teacher-title">{title}</Paragraph>
      <Paragraph className="teacher-description">{description}</Paragraph>
    </Card>
  );
};

export default TeacherCard;
