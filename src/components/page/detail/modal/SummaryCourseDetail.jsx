import React from "react";
import { Typography, Image, Row, Col, Tag, Rate, Badge } from "antd";
import CheckoutSummary from "@/components/share/CheckoutSummary";
import { DownloadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import FormatUtils from "@/ulti/Format";

const { Title, Paragraph, Text } = Typography;

const SummaryCourseDetail = ({ course }) => {
  const price = course.discountPrice || course.price;
  const vat = price * 0.1;
  const total = price + vat;

  return (
    <div className="sumary-course-detail">
      <Row gutter={[32, 32]}>
        <Col xs={24} md={24} lg={16}>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={10} md={10} lg={10}>
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

            <Col xs={24} sm={14} md={14} lg={14}>
              <Title
                className="title"
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
                        {FormatUtils.vndPrice(
                          course.discountPrice || course.price
                        )}
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

        <Col xs={24} md={24} lg={8}>
          <CheckoutSummary
            className="checkout-detail"
            total={price}
            vat={vat}
            grandTotal={total}
            onCheckout={() =>
              window.messageApi?.success(
                "Giao dịch thành công. Thông tin khóa học đã được gửi đến email của bạn."
              )
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default SummaryCourseDetail;
