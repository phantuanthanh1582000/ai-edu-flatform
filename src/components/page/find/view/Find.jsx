import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Row, Col, Spin, Empty } from 'antd';
import { getCourses } from '@/services/api';
import CourseCard from '@/components/share/CourseCard';

const { Title } = Typography;

const FindPage = () => {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const query = new URLSearchParams(location.search);
  const filters = {};
  if (query.get('category')) filters.category = query.get('category');
  if (query.get('subcategory')) filters.subcategory = query.get('subcategory');
  if (query.get('isAdvanced') === 'true') filters.isAdvanced = true;
  if (query.get('popular') === 'true') filters.popular = true;
  if (query.get('discountOnly') === 'true') filters.discountOnly = true;

  setLoading(true);
  getCourses(filters)
    .then((res) => {
      if (res.data?.code === 1) {
        setCourses(res.data.data || []);
      }
    })
    .finally(() => {
      setLoading(false);
    });
}, [location.search]);


  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: 24 }}>
      <Title level={2}>Danh sách khóa học</Title>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
        </div>
      ) : courses.length === 0 ? (
        <Empty description="Không tìm thấy khóa học phù hợp" />
      ) : (
        <Row gutter={[24, 24]}>
          {courses.map((course) => (
            <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
              <CourseCard {...course} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default FindPage;
