import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { DebounceSelect } from '@/components/share/DebounceSelect';
import '@/styles/header.style.scss'; 

const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchCourseOptions = async (search) => {
    const allCourses = [
      { label: 'React cơ bản', value: 'react' },
      { label: 'NodeJS nâng cao', value: 'nodejs' },
      { label: 'Khóa học AI', value: 'ai' },
      { label: 'Tiếng Anh giao tiếp', value: 'english' },
    ];
    return allCourses
      .filter((c) => c.label.toLowerCase().includes(search.toLowerCase()))
      .map((c) => ({
        label: c.label,
        value: c.value,
      }));
  };

  const onSelectCourse = (course) => {
    navigate(`/?search=${encodeURIComponent(course.value)}`);
  };

  const menuItems = [
    { key: '/', label: <Link to="/">Trang chủ</Link> },
    { key: '/about', label: <Link to="/about">Giới thiệu</Link> },
    {
      key: '/cart',
      label: (
        <Link to="/cart">
          <ShoppingCartOutlined style={{ fontSize: 18 }} />
        </Link>
      ),
    },
    { key: '/login', label: <Link to="/login">Đăng nhập/Đăng ký</Link> },
  ];

  return (
    <Header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">🎓 PTT ACADEMY</Link>
        </div>
        <DebounceSelect
            placeholder="Tìm khoá học..."
            fetchOptions={fetchCourseOptions}
            onChange={onSelectCourse}
            style={{width: 500, height: 40}}
        />
      </div>

      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="menu"
      />
    </Header>
  );
};

export default HeaderComponent;
