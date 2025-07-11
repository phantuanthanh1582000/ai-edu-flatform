import React, { useEffect, useState } from 'react';
import { Card, Spin, Empty, Row, Col } from 'antd';
import { getFavorites } from '@/services/api';
import CourseCard from '@/components/share/CourseCard';

const FavoriteList = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);

        // Lấy danh sách ID từ localStorage
        const favIds = JSON.parse(localStorage.getItem('favorites') || '[]');

        // Nếu không có sản phẩm yêu thích, dừng lại
        if (favIds.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        // Gọi API lấy danh sách chi tiết
        const res = await getFavorites(favIds);
        setFavorites(res.data?.data || []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách yêu thích:', error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Card title="Danh sách yêu thích">
      {loading ? (
        <Spin />
      ) : favorites.length === 0 ? (
        <Empty description="Chưa có sản phẩm yêu thích nào." />
      ) : (
        <Row gutter={[16, 16]}>
  {favorites.map((course) => (
    <Col xs={24} sm={12} md={6} lg={6} key={course.id}>
      <CourseCard {...course} />
    </Col>
  ))}
</Row>
      )}
    </Card>
  );
};

export default FavoriteList;
