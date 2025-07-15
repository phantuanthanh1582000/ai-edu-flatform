import React from "react";
import { Row, Col, Typography, Button } from "antd";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SectionCourse = ({ title, courses = [], showMax = 8, showMoreLink }) => {
  if (!courses.length) return null;

  return (
    <div className="section-course">
      <Row justify="space-between" align="middle" className="section-header">
        <Col>
          <Title level={2} className="section-title">
            {title}
          </Title>
        </Col>

        {showMoreLink && (
          <Col>
            <Link to={showMoreLink}>
              <Button type="link" className="section-more-btn">
                Xem thêm <ArrowRightOutlined />
              </Button>
            </Link>
          </Col>
        )}
      </Row>

      <div className="course-scroll-wrapper">
        {courses.slice(0, showMax).map((course) => (
          <div key={course.id} className="course-scroll-item">
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionCourse;
