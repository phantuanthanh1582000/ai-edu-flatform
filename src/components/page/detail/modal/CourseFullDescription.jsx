// src/components/course/CourseFullDescription.jsx

import React from "react";
import { Typography, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

const CourseFullDescription = ({ course }) => {
  return (
    <div className="course-full-description section-content">
      <div
        style={{
          border: "1px solid black",
          padding: 32,
          background: "transparent",
        }}
      >
        <Row gutter={48}>
          {/* Cột trái: Giới thiệu + Yêu cầu */}
          <Col xs={24} md={12}>
            <Title
              className="title"
              level={2}
              style={{
                marginTop: 0,
                fontSize: 32,
              }}
            >
              Giới thiệu khóa học
            </Title>

            <Paragraph
              className="content"
              style={{
                whiteSpace: "pre-line",
                fontSize: 18,
                lineHeight: 2,
                marginBottom: 0,
              }}
            >
              {course.fullDesc}
            </Paragraph>

            {course.prerequisites && (
              <>
                <Title
                  className="title"
                  level={2}
                  style={{
                    marginTop: 40,
                    fontSize: 32,
                  }}
                >
                  Yêu cầu trước khóa học
                </Title>
                <Paragraph
                  className="content"
                  style={{
                    fontSize: 18,
                    lineHeight: 2,
                  }}
                >
                  {course.prerequisites}
                </Paragraph>
              </>
            )}
          </Col>

          {/* Cột phải: Kỹ năng đạt được */}
          <Col xs={24} md={12}>
            {course.skills?.length > 0 && (
              <>
                <Title
                  className="title"
                  level={2}
                  style={{
                    fontSize: 32,
                  }}
                >
                  Kỹ năng đạt được
                </Title>
                <ul
                  style={{
                    fontSize: 18,
                    lineHeight: 2,
                    paddingLeft: 0,
                    listStyleType: "none",
                  }}
                >
                  {course.skills.map((skill, index) => (
                    <li
                      key={index}
                      style={{
                        position: "relative",
                        paddingLeft: 20,
                        marginBottom: 8,
                      }}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Col>
        </Row>
      </div>

      <div
        className="lesson"
        style={{
          border: "1px solid black",
          padding: 32,
          background: "transparent",
          marginTop: 50,
        }}
      >
        {course.lessons?.length > 0 && (
          <>
            <Title level={2} style={{ fontSize: 32 }} className="title">
              Nội dung bài học
            </Title>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {course.lessons.map((lesson, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    background: "#e0f7fa",
                    borderRadius: 8,
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div
                    className="content"
                    style={{
                      fontSize: 18,
                      flex: 1,
                      fontWeight: 600,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Phần {index + 1}: {lesson.title}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      marginLeft: 16,
                      whiteSpace: "nowrap",
                      color: "#888",
                    }}
                  >
                    ⏱️ {lesson.duration}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseFullDescription;
