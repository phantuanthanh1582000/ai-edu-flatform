import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Spin,
  Empty,
  Card,
  Select,
  Switch,
  Pagination
} from 'antd';
import { getCourses } from '@/services/api';
import CourseCard from '@/components/share/CourseCard';
import '@/styles/find.style.scss';

const { Option } = Select;

const FindPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null); // 👈 null ban đầu

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const filters = {
      page: parseInt(query.get('page')) || 1,
      limit: parseInt(query.get('limit')) || 12, // 👈 thêm page + limit
    };

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

          if (res.data.pagination) {
            const { page, limit, total } = res.data.pagination;
            setPagination({ current: page, pageSize: limit, total });
          } 
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search]);

  const handlePageChange = (page, pageSize) => {
    const query = new URLSearchParams(location.search);
    query.set('page', page);
    query.set('limit', pageSize);
    navigate({ search: query.toString() });
  };

  return (
    <Card
      className="find-page-wrapper"
      title={<span style={{ fontSize: 30, fontWeight: 600 }}>Danh sách khóa học</span>}
      headStyle={{ padding: '16px 24px' }}
      extra={
        <div style={{ display: 'flex', gap: 16 }}>
          <Select
            placeholder="Chọn danh mục"
            style={{ width: 150 }}
            onChange={(value) => {
              const query = new URLSearchParams(location.search);
              query.set('category', value);
              query.delete('page'); // reset page khi lọc
              navigate({ search: query.toString() });
            }}
          >
            <Option value="frontend">Frontend</Option>
            <Option value="backend">Backend</Option>
            <Option value="mobile">Mobile</Option>
          </Select>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Nâng cao:</span>
            <Switch
              onChange={(checked) => {
                const query = new URLSearchParams(location.search);
                query.set('isAdvanced', checked);
                query.delete('page'); // reset page khi lọc
                navigate({ search: query.toString() });
              }}
            />
          </div>
        </div>
      }
    >
      {loading ? (
        <div className="find-page-loading">
          <Spin size="large" />
        </div>
      ) : courses.length === 0 ? (
        <div className="find-page-empty">
          <Empty description="Không tìm thấy khóa học phù hợp" />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {courses.map((course) => (
              <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                <CourseCard {...course} />
              </Col>
            ))}
          </Row>

          {pagination && (
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'end' }}>
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default FindPage;
