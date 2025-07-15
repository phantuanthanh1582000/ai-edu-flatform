import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import { FacebookFilled, YoutubeFilled, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "@/styles/footer.style.scss";

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterComponent = () => {
  return (
    <Footer className="footer">
      <Row gutter={[32, 32]}>
        <Col xs={12} sm={12} md={6}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Title
              level={3}
              className="footer-logo"
              style={{ cursor: "pointer", margin: 0 }}
            >
              🎓 PTT ACADEMY
            </Title>
          </Link>
          <Text className="footer-description">
            Mua khóa học online ngành lập trình học mọi lúc mọi nơi.
          </Text>
        </Col>

        <Col xs={12} sm={12} md={6}>
          <Title level={5}>Về chúng tôi</Title>
          <Space direction="vertical">
            <Link to="/about">Giới thiệu</Link>
            <Link to="/policy">Chính sách</Link>
            <Link to="/contact">Liên hệ</Link>
          </Space>
        </Col>

        <Col xs={12} sm={12} md={6}>
          <Title level={5}>Hỗ trợ</Title>
          <Space direction="vertical">
            <Link to="/faq">Câu hỏi thường gặp</Link>
            <Link to="/support">Trung tâm hỗ trợ</Link>
            <Link to="/feedback">Góp ý</Link>
          </Space>
        </Col>

        <Col xs={12} sm={12} md={6}>
          <Title level={5}>Kết nối</Title>
          <div className="footer-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookFilled />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeFilled />
            </a>
            <a href="mailto:contact@pttacademy.com">
              <MailOutlined />
            </a>
          </div>
        </Col>
      </Row>

      <div className="footer-bottom">
        <Text type="secondary">
          © {new Date().getFullYear()} PTT Academy. All rights reserved.
        </Text>
      </div>
    </Footer>
  );
};

export default FooterComponent;
