import React from "react";
import { Row, Col, Typography, Button } from "antd";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SectionCourse = ({ title, courses = [], showMax = 8, showMoreLink }) => {
  if (!courses.length) return null;

  return (
    <div style={{ margin: "30px 0", display: "flex", flexDirection: "column" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            {title}
          </Title>
        </Col>

        {showMoreLink && ( // ✅ chỉ hiện nếu có showMoreLink
          <Col>
            <Link to={showMoreLink}>
              <Button type="link" style={{ fontSize: 16 }}>
                Xem thêm <ArrowRightOutlined />
              </Button>
            </Link>
          </Col>
        )}
      </Row>

      <Row gutter={[16, 16]}>
        {courses.slice(0, showMax).map((course) => (
          <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
            <CourseCard {...course} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SectionCourse;
