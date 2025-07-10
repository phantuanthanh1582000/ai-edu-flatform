import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { DebounceSelect } from '@/components/share/DebounceSelect';
import { Courses } from '@/data/mockData';
import '@/styles/header.style.scss'; 

const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchCourseOptions = async (search) => {
    return Courses
      .filter((cat) => cat.name.toLowerCase().includes(search.toLowerCase()))
      .map((cat) => ({
        label: cat.name,
        value: cat.id,
      }));
  };

  const onSelectCourse = (course) => {
    navigate(`/courses/${course.value}`); 
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
