import React from "react";
import { useNavigate } from "react-router-dom";
import { Courses } from "@/data/mockData";
import FormatUtils from "@/ulti/Format";
import { Card, Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

const CustomCourseList = ({ category }) => {
  const navigate = useNavigate();
  const filtered = Courses.filter((c) => c.category === category);

  const handleClick = (id) => {
    navigate(`/course/${id}`);
  };

  return (
    <div className="custom-course-list-wrapper">
      {filtered.map((course) => (
        <Card
          key={course.id}
          onClick={() => handleClick(course.id)}
          hoverable
          className="custom-course-card"
          bodyStyle={{ padding: 0 }}
        >
          <Row gutter={10} align="middle">
            <Col span={8} className="course-image-col">
              <img
                src={course.image}
                alt={course.name}
                className="course-image"
              />
            </Col>
            <Col span={16} className="course-info">
              <Title level={5} className="course-title">
                {course.name}
              </Title>
              <Text>👨‍🏫 {course.teacher}</Text>
              <br />
              <Text strong className="course-price">
                💰 {FormatUtils.vndPrice(course.price)}
              </Text>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default CustomCourseList;
