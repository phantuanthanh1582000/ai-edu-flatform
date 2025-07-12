import React, { useEffect, useState } from 'react';
import { Card, Spin, Empty, Row, Col, Pagination } from 'antd';
import { getFavorites } from '@/services/api';
import CourseCard from '@/components/share/CourseCard';

const FavoriteList = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const pageSize = 8;

  const fetchFavorites = async (page = 1) => {
    try {
      setLoading(true);

      const favIds = JSON.parse(localStorage.getItem('favorites') || '[]');

      if (favIds.length === 0) {
        setFavorites([]);
        setTotal(0);
        setLoading(false);
        return;
      }

      const res = await getFavorites(favIds, page, pageSize);
      setFavorites(res.data?.data || []);
      setTotal(res.data?.pagination?.total || 0);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách yêu thích:', error);
      setFavorites([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfavorite = (idToRemove) => {
  const currentFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
  const updatedFavs = currentFavs.filter((id) => id !== idToRemove);
  localStorage.setItem('favorites', JSON.stringify(updatedFavs));

 
  const isLastItemOnPage = favorites.length === 1 && currentPage > 1;
  const newPage = isLastItemOnPage ? currentPage - 1 : currentPage;

  setCurrentPage(newPage); 
  fetchFavorites(newPage); 
};


  useEffect(() => {
    fetchFavorites(currentPage);
  }, [currentPage]);

  return (
    <Card title="Danh sách yêu thích">
      {loading ? (
        <Spin />
      ) : total === 0 ? (
        <Empty description="Chưa có sản phẩm yêu thích nào." />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {favorites.map((course) => (
              <Col xs={24} sm={12} md={6} lg={6} key={course.id}>
                <CourseCard {...course} isFavorite onUnfavorite={() => handleUnfavorite(course.id)} />
              </Col>
            ))}
          </Row>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={(page) => setCurrentPage(page)}
            style={{ textAlign: 'center', marginTop: 16 }}
          />
        </>
      )}
    </Card>
  );
};

export default FavoriteList;
