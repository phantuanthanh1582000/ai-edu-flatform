import React from "react";
import { Dropdown, Typography, Row, Col, Button, Tooltip } from "antd";
import { Categories } from "@/data/mockData";
import BannerCarousel from "@/components/share/BannerCarousel";
import TeacherCarousel from "@/components/share/TeacherCarousel";
import ChatBotUI from "@/components/share/ChatBotUI";
import { Link } from "react-router-dom";
import CategoryTabs from "@/components/share/CategoryTabs.jsx";
import SectionCourse from "@/components/share/SectionCourse";
import useHomePage from "../hook/useHomePage";
import "@/styles/home.style.scss";

const { Title } = Typography;

const HomePage = () => {
  const { advancedCourses, popularCourses, discountCourses } = useHomePage();

  return (
    <div className="home-page">
      <div className="category-bar">
        <div className="category-links">
          {Categories.map((category) => {
            if (category.value === "") return null;
            const hasSub =
              Array.isArray(category.subcategories) &&
              category.subcategories.length > 0;

            const menuItems = hasSub
              ? category.subcategories.map((sub) => ({
                  key: sub.value,
                  label: (
                    <Link
                      to={`/find?category=${category.value}&subcategory=${sub.value}`}
                    >
                      {sub.name}
                    </Link>
                  ),
                }))
              : [];

            return (
              <Dropdown
                key={category.value}
                menu={{ items: menuItems }}
                trigger={["hover"]}
                placement="bottom"
              >
                <Link
                  to={`/find?category=${category.value}`}
                  className="category-link"
                >
                  {category.name}
                </Link>
              </Dropdown>
            );
          })}
        </div>
      </div>

      <div className="banner-wrapper">
        <div className="banner-inner">
          <BannerCarousel />
        </div>
      </div>

      <div className="section-wrapper">
        <div className="section-content">
          <SectionCourse
            title="Các khoá học ưu đãi"
            courses={discountCourses}
            showMax={4}
            showMoreLink="/find?discountOnly=true"
          />
        </div>
      </div>

      <div className="section-wrapper">
        <div className="section-content">
          <SectionCourse
            title="Các khóa học phổ biến"
            courses={popularCourses}
            showMax={4}
            showMoreLink="/find?popular=true"
          />
        </div>
      </div>

      <div className="section-wrapper">
        <div className="section-content">
          <SectionCourse
            title="Các khóa học nâng cao"
            courses={advancedCourses}
            showMax={4}
            showMoreLink="/find?isAdvanced=true"
          />
        </div>
      </div>

      <div className="section-wrapper">
        <div className="section-content">
          <Title level={2} className="section-title">
            Chương trình đào tạo theo lĩnh vực
          </Title>
          <CategoryTabs />
        </div>
      </div>

      <div className="section-wrapper">
        <div className="section-content">
          <Title level={2} className="section-title">
            Giảng viên tiêu biểu
          </Title>
          <TeacherCarousel />
        </div>
      </div>

      <div className="footer-section">
        <div className="section-content">
          <Row align="middle" gutter={[32, 32]}>
            <Col xs={24} sm={16} md={16}>
              <div className="become-teacher">
                <Title level={3} className="section-title white-text">
                  Trở thành giảng viên tại PTT Academy
                </Title>
                <p className="teacher-desc">
                  Chia sẻ kiến thức, truyền cảm hứng cho hàng ngàn học viên và
                  phát triển sự nghiệp giảng dạy của bạn cùng chúng tôi.
                </p>
                <Button className="register-btn">Đăng ký ngay</Button>
              </div>
            </Col>
            <Col xs={24} sm={8} md={8} className="teacher-img-wrapper">
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                alt="Become a Teacher"
                className="teacher-img"
              />
            </Col>
          </Row>
        </div>
      </div>

      <Link to="/find?suggested=true">
        <Tooltip title="Gợi ý sản phẩm phù hợp" placement="leftTop">
          <Button className="suggest-btn">🎁</Button>
        </Tooltip>
      </Link>

      <ChatBotUI />
    </div>
  );
};

export default HomePage;
