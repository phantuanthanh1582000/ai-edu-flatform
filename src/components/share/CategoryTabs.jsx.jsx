import React, { useEffect, useState } from 'react';
import { Tabs, Spin, Row, Col, Typography, message, Button } from 'antd';
import { getCourses } from '@/services/api';
import { Categories } from '@/data/mockData';
import CourseCard from './CourseCard';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const CategoryTabs = () => {
  const [activeKey, setActiveKey] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCourses = async (category) => {
    setLoading(true);
    try {
      const res = await getCourses({ category });
      if (res.data.code === 1) {
        setCourses(res.data.data);
      } else {
        message.error(res.data.message || 'Không lấy được khoá học');
      }
    } catch (err) {
      message.error('Lỗi kết nối đến máy chủ!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(activeKey);
  }, [activeKey]);

  const handleViewMore = () => {
    navigate(`/find?category=${activeKey}`);
  };

  return (
    <Tabs
      activeKey={activeKey}
      onChange={setActiveKey}
      size="large"
      tabBarGutter={32}
      style={{ background: '#fff', borderRadius: 8, padding: 24 }}
      items={Categories.map((cate) => ({
        key: cate.value,
        label: cate.name,
        children: (
          <Spin spinning={loading}>
            <Row gutter={[16, 16]} justify="left">
              {courses.slice(0, 12).map((course) => (
                <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                  <CourseCard {...course} />
                </Col>
              ))}
            </Row>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Button type="primary" onClick={handleViewMore} style={{ fontWeight: 'bold' }}>
                Xem thêm
              </Button>
            </div>
          </Spin>
        )
      }))}
    />
  );
};

export default CategoryTabs;
