import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCourseDetail } from "@/services/api";
import {
  Typography,
  Image,
  Row,
  Col,
  Tag,
  Rate,
  Badge,
  Spin,
  List,
} from "antd";
import { DownloadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import FormatUtils from "@/ulti/Format";
import "@/styles/detail.style.scss";

const { Title, Text, Paragraph } = Typography;

const CourseDetailPage = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    getCourseDetail(courseId)
      .then((res) => {
        if (res.data.code === 1) {
          setCourse(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  if (!courseId) {
    return <Text type="danger">❌ Không tìm thấy ID khóa học.</Text>;
  }

  if (loading) return <Spin />;

  if (!course) {
    return <Text type="danger">❌ Không tìm thấy thông tin khóa học.</Text>;
  }

  const price = course.discountPrice || course.price;
  const vat = price * 0.1;
  const total = price + vat;

  return (
    <div className="course-detail-container">
      <div className="sumary-course-detail">
        <Row gutter={[32, 32]}>
          {/* Cột trái: Thông tin khóa học */}
          <Col xs={24} md={16}>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={10}>
                <div style={{ position: "relative" }}>
                  {course.isAdvanced && (
                    <Tag
                      color="#722ed1"
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        zIndex: 2,
                        fontWeight: 600,
                      }}
                    >
                      Nâng cao
                    </Tag>
                  )}
                  {course.discountPrice ? (
                    <Badge.Ribbon text="Ưu đãi" color="red" placement="end">
                      <Image
                        src={course.image}
                        alt={course.name}
                        width="100%"
                        style={{ borderRadius: 8 }}
                      />
                    </Badge.Ribbon>
                  ) : (
                    <Image
                      src={course.image}
                      alt={course.name}
                      width="100%"
                      style={{ borderRadius: 8 }}
                    />
                  )}
                </div>
              </Col>

              <Col xs={24} md={14}>
                <Title
                  level={2}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  {course.name}
                  {course.popular && (
                    <span className="popular-badge">Phổ biến</span>
                  )}
                </Title>

                <div style={{ marginBottom: 12 }}>
                  <Tag color="blue">{course.category}</Tag>
                  <Tag color="cyan">{course.subcategory}</Tag>
                </div>

                <Paragraph style={{ marginTop: 20 }}>
                  {course.shortDesc}
                </Paragraph>

                <table className="course-info-table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Giảng viên:</strong>
                      </td>
                      <td>{course.teacher}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Số video:</strong>
                      </td>
                      <td>
                        <VideoCameraOutlined /> {course.videoCount}
                      </td>
                    </tr>
                    {course.rating && (
                      <tr>
                        <td>
                          <strong>Đánh giá:</strong>
                        </td>
                        <td>
                          <Rate
                            disabled
                            defaultValue={course.rating}
                            style={{ fontSize: 14, color: "#fadb14" }}
                          />{" "}
                          ({course.rating})
                        </td>
                      </tr>
                    )}
                    {course.purchasedCount && (
                      <tr>
                        <td>
                          <strong>Lượt mua:</strong>
                        </td>
                        <td>
                          <DownloadOutlined style={{ color: "#1890ff" }} />{" "}
                          {course.purchasedCount.toLocaleString()}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        <strong>Giá:</strong>
                      </td>
                      <td>
                        <Text style={{ color: "#ff4d4f", fontWeight: 600 }}>
                          {course.discountPrice
                            ? FormatUtils.vndPrice(course.discountPrice)
                            : FormatUtils.vndPrice(course.price)}
                        </Text>
                        {course.discountPrice && (
                          <Text delete style={{ marginLeft: 8, color: "#aaa" }}>
                            {FormatUtils.vndPrice(course.price)}
                          </Text>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>

          {/* Cột phải: Thanh toán */}
          <Col xs={24} md={8}>
            <div
              style={{
                border: "1px solid #e0e0e0",
                padding: 24,
                borderRadius: 12,
                background: "transparent",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Title level={4} style={{ marginBottom: 20 }}>
                🧾 Thanh toán
              </Title>

              <table style={{ width: "100%", marginBottom: 24 }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "8px 0" }}>
                      <Text strong>Giá khóa học:</Text>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Text
                        style={{
                          color: "#ff4d4f",
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      >
                        {FormatUtils.vndPrice(
                          course.discountPrice || course.price
                        )}
                      </Text>
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "8px 0" }}>
                      <Text strong>VAT (10%):</Text>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {FormatUtils.vndPrice(vat)}
                    </td>
                  </tr>

                  <tr>
                    <td style={{ padding: "8px 0" }}>
                      <Text strong>Tổng cộng:</Text>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#52c41a",
                        }}
                      >
                        {FormatUtils.vndPrice(total)}
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                style={{
                  width: "100%",
                  background: "#722ed1",
                  color: "#fff",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 16,
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#531dab")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#722ed1")
                }
              >
                Thanh toán ngay
              </button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Mô tả chi tiết */}
      <div className="course-full-description" style={{ marginTop: 48 }}>
        {/* 👇 Gộp giới thiệu + yêu cầu trước khóa học */}
        <div
          style={{
            border: "1px solid black",
            padding: 32,
            background: "transparent",
            margin: 70,
          }}
        >
          <Row gutter={48}>
            {/* Cột trái: Giới thiệu + Yêu cầu */}
            <Col xs={24} md={12}>
              <Title
                level={2}
                style={{
                  marginTop: 0,
                  fontWeight: 900,

                  fontSize: 32, // tăng size tiêu đề lớn hơn
                }}
              >
                Giới thiệu khóa học
              </Title>

              <Paragraph
                style={{
                  whiteSpace: "pre-line",
                  fontSize: 18, // chữ đoạn văn to hơn
                  lineHeight: 2,
                  marginBottom: 0,
                }}
              >
                {course.fullDesc}
              </Paragraph>

              {course.prerequisites && (
                <>
                  <Title
                    level={2}
                    style={{
                      marginTop: 40,
                      fontWeight: 800,
                      fontSize: 32,
                    }}
                  >
                    Yêu cầu trước khóa học
                  </Title>
                  <Paragraph
                    style={{
                      fontSize: 18, // chữ đoạn văn to hơn
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
                    level={2}
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                    }}
                  >
                    Kỹ năng đạt được
                  </Title>
                  <ul
                    style={{
                      fontSize: 18,
                      lineHeight: 2,
                      paddingLeft: 0,
                      listStyleType: "none", // bỏ dấu chấm mặc định
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
          style={{
            border: "1px solid black",
            padding: 32,
            background: "transparent",
            margin: 70,
          }}
        >
          {course.lessons?.length > 0 && (
            <>
              <Title level={2} style={{ fontSize: 32 }}>
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
                      background: "#f9f9f9",
                      borderRadius: 8,
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div
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
    </div>
  );
};

export default CourseDetailPage;
