import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Spin, message } from 'antd';
import { getProducts } from '@/services/api';

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
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        Danh sách khoá học
      </Title>

      <Spin spinning={loading} tip="Đang tải sản phẩm...">
        <Row gutter={[16, 16]} justify="center">
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    style={{ height: 180, objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <p style={{ marginBottom: 4 }}>{product.shortDesc}</p>
                      <strong>{product.price.toLocaleString()}đ</strong>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
};

export default HomePage;
