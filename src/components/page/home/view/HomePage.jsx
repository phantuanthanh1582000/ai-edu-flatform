import React from 'react';
import { Dropdown, Typography } from 'antd';
import { Categories } from '@/data/mockData';
import BannerCarousel from '@/components/share/BannerCarousel';
import { Link, useNavigate } from 'react-router-dom';
import CategoryTabs from '@/components/share/CategoryTabs.jsx';
import '@/styles/home.style.scss';

const { Title } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* DANH MỤC CATEGORY */}
      <div className="category-bar">
        <div className="category-links">
          {Categories.map((category) => {

          if (category.value === '') return null;
          const hasSub = Array.isArray(category.subcategories) && category.subcategories.length > 0;

          const menuItems = hasSub
            ? category.subcategories.map((sub) => ({
                key: sub.value,
                label: (
                  <Link to={`/courses?subcategory=${sub.value}`}>
                    {sub.name}
                  </Link>
                ),
              }))
            : [];

          return (
            <Dropdown
              key={category.value}
              menu={{ items: menuItems }}
              trigger={['hover']}
              placement="bottom"
            >
              <Link
                to={`/courses?category=${category.value}`}
                className="category-link"
                style={{ cursor: 'pointer' }}
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

      {/* COURSE TABS */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <div style={{ maxWidth: 1300, width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
            Chương trình đào tạo theo lĩnh vực
          </Title>
          <CategoryTabs />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
