import React, { useEffect, useState } from "react";
import { Dropdown, Typography, Row, Col, Button, Tooltip } from "antd";
import { Categories } from "@/data/mockData";
import BannerCarousel from "@/components/share/BannerCarousel";
import TeacherCarousel from "@/components/share/TeacherCarousel";
import ChatBotUI from "@/components/share/ChatBotUI";
import { Link } from "react-router-dom";
import CategoryTabs from "@/components/share/CategoryTabs.jsx";
import SectionCourse from "@/components/share/SectionCourse";
import "@/styles/home.style.scss";
import { getCourses } from "@/services/api";

const { Title } = Typography;

const HomePage = () => {
  const [advancedCourses, setAdvancedCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [discountCourses, setDiscountCourses] = useState([]);

  useEffect(() => {
    getCourses({ isAdvanced: true }).then((res) => {
      if (res.data?.code === 1) {
        setAdvancedCourses(res.data.data);
      }
    });

    getCourses({ popular: true }).then((res) => {
      if (res.data?.code === 1) {
        setPopularCourses(res.data.data);
      }
    });

    getCourses({ discountOnly: true }).then((res) => {
      if (res.data?.code === 1) {
        setDiscountCourses(res.data.data);
      }
    });
  }, []);

  return (
    <div className="home-page">
      {/* DANH MỤC CATEGORY */}
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

      {/* BANNER */}
      <div className="banner-wrapper">
        <div className="banner-inner">
          <BannerCarousel />
        </div>
      </div>

      {/* ƯU ĐÃI */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <div style={{ maxWidth: 1300, width: "100%" }}>
          <SectionCourse
            title="Các khoá học ưu đãi"
            courses={discountCourses}
            showMax={4}
            showMoreLink="/find?discountOnly=true"
          />
        </div>
      </div>

      {/* PHỔ BIẾN */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <div style={{ maxWidth: 1300, width: "100%" }}>
          <SectionCourse
            title="Các khóa học phổ biến"
            courses={popularCourses}
            showMax={4}
            showMoreLink="/find?popular=true"
          />
        </div>
      </div>

      {/* NÂNG CAO */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <div style={{ maxWidth: 1300, width: "100%" }}>
          <SectionCourse
            title="Các khóa học nâng cao"
            courses={advancedCourses}
            showMax={4}
            showMoreLink="/find?isAdvanced=true"
          />
        </div>
      </div>

      {/* TABS */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}
      >
        <div style={{ maxWidth: 1300, width: "100%" }}>
          <Title level={2} style={{ textAlign: "left", marginBottom: 24 }}>
            Chương trình đào tạo theo lĩnh vực
          </Title>
          <CategoryTabs />
        </div>
      </div>

      {/* GIẢNG VIÊN */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1300, width: "100%", margin: 24 }}>
          <Title level={2} style={{ textAlign: "left", marginBottom: 24 }}>
            Giảng viên tiêu biểu
          </Title>
          <TeacherCarousel />
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div
        style={{
          background: "linear-gradient(90deg, #FFD700, #1890FF)",
          padding: "60px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          <Row align="middle" gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <div style={{ color: "#fff" }}>
                <Title level={2} style={{ color: "#fff", marginBottom: 12 }}>
                  Trở thành giảng viên tại PTT Academy
                </Title>
                <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
                  Chia sẻ kiến thức, truyền cảm hứng cho hàng ngàn học viên và
                  phát triển sự nghiệp giảng dạy của bạn cùng chúng tôi.
                </p>
                <Button
                  type="default"
                  size="large"
                  style={{
                    backgroundColor: "#fff",
                    color: "#1890FF",
                    fontWeight: 600,
                    borderRadius: 24,
                    padding: "10px 32px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  Đăng ký ngay
                </Button>
              </div>
            </Col>

            <Col xs={24} md={12} style={{ textAlign: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                alt="Become a Teacher"
                style={{ maxWidth: "100%", height: "auto", maxHeight: 280 }}
              />
            </Col>
          </Row>
        </div>
      </div>

      <Link to="/find?suggested=true">
        <Tooltip title="Gợi ý sản phẩm phù hợp" placement="leftTop">
          <Button
            type="primary"
            shape="circle"
            size="large"
            style={{
              position: "fixed",
              bottom: 110,
              right: 34,
              width: 56,
              height: 56,
              backgroundColor: "#722ed1",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            🎁
          </Button>
        </Tooltip>
      </Link>

      <ChatBotUI />
    </div>
  );
};

export default HomePage;
