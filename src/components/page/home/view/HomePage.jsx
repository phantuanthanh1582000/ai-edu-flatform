import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin, message, Dropdown, Menu } from 'antd';
import { getProducts } from '@/services/api';
import BannerCarousel from '@/components/share/BannerCarousel';
import CourseCard from '@/components/share/CourseCard';
import { Link } from 'react-router-dom';
import { Categories } from '@/data/mockData';
import '@/styles/home.style.scss';

const { Title } = Typography;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        if (res.data.code === 1) {
          setProducts(res.data.data);
        } else {
          message.error(res.data.message || 'Không lấy được sản phẩm');
        }
      } catch (err) {
        message.error('Lỗi kết nối đến máy chủ!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* DANH MỤC CATEGORY */}
      <div className="category-bar">
        <div className="category-links">
          {Categories.map((category) => {
            const menu = (
              <Menu>
                {category.subcategories?.map((sub) => (
                  <Menu.Item key={sub.value}>
                    <Link to={`/courses?subcategory=${sub.value}`}>
                      {sub.name}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            );

            return (
              <Dropdown
                key={category.value}
                overlay={menu}
                trigger={['hover']}
                placement="bottom"
              >
                <Link to={`/courses?category=${category.value}`} className="category-link">
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

      {/* DANH SÁCH KHÓA HỌC */}
      <Title level={2} className="course-title">
        Danh sách khoá học Front End
      </Title>

      <Spin spinning={loading} tip="Đang tải sản phẩm...">
        <Row gutter={[16, 16]} justify="center">
          {products.map((course) => (
            <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
              <CourseCard
                name={course.name}
                price={course.price}
                image={course.image}
                shortDesc={course.shortDesc}
              />
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
};

export default HomePage;
