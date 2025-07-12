import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Courses } from '@/data/mockData';
import { Card, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

const CustomCourseList = ({ category }) => {
  const navigate = useNavigate();
  const filtered = Courses.filter(c => c.category === category);

  const handleClick = (id) => {
    navigate(`/course/${id}`);
  };

  return (
    <div style={{ background: '#1890ff', padding: '10px', borderRadius: '10px', width: '100%' }}>
      {filtered.map(course => (
        <Card
          key={course.id}
          onClick={() => handleClick(course.id)}
          hoverable
          style={{
            marginBottom: '10px',
            borderRadius: '8px',
            padding: 0,
            cursor: 'pointer',
          }}
          bodyStyle={{ padding: 0 }}
        >
          <Row gutter={10} align="middle">
            <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={course.image}
                alt={course.name}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Col>
            <Col span={16} style={{ padding: '10px' }}>
              <Title
                level={5}
                style={{
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {course.name}
              </Title>
              <Text>👨‍🏫 {course.teacher}</Text><br />
              <Text strong style={{ color: 'green' }}>
                💰 {course.price.toLocaleString()}đ
              </Text>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default CustomCourseList;
