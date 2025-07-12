import React, { useEffect, useState } from 'react';
import { Row, Col, Card, List, Image, Typography, Divider, Button, InputNumber } from 'antd';
import FormatUtils from '@/ulti/Format';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const vat = total * 0.1;
  const grandTotal = total + vat;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>🛒 Giỏ hàng</Title>
      <Row gutter={24}>
        {/* Danh sách sản phẩm */}
        <Col xs={24} md={16}>
          <Card title="Sản phẩm đã chọn">
            {cartItems.length === 0 ? (
              <Text>Không có sản phẩm nào trong giỏ hàng.</Text>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <DeleteOutlined
                        key="delete"
                        style={{ color: 'red' }}
                        onClick={() => handleRemove(item.id)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Image src={item.image} width={80} />}
                      title={item.name}
                      description={
                        <>
                          <Text type="secondary">{item.shortDesc}</Text>
                          <br />
                          <Text>Số lượng: </Text>
                          <InputNumber
                            min={1}
                            value={item.quantity}
                            onChange={(val) => handleQuantityChange(item.id, val)}
                            style={{ margin: '8px 0' }}
                          />
                          <br />
                          <strong style={{ color: '#d4380d' }}>
                            {FormatUtils.vndPrice(item.price * item.quantity)}
                          </strong>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>

        {/* Thông tin thanh toán */}
        <Col xs={24} md={8}>
          <Card
            title={<span style={{ color: 'white' }}>Thanh toán</span>}
            bordered={false}
            style={{
              backgroundColor: 'rgb(0 53 85 / var(--tw-bg-opacity, 1))',
              color: 'white',
              borderRadius: 8,
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            }}
            bodyStyle={{ color: 'white' }}
          >
            <div style={{ marginBottom: 12 }}>
              <Text style={{ color: 'white' }}>Tạm tính:</Text>
              <Text strong style={{ float: 'right', color: 'white' }}>
                {FormatUtils.vndPrice(total)}
              </Text>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Text style={{ color: 'white' }}>VAT (10%):</Text>
              <Text strong style={{ float: 'right', color: 'white' }}>
                {FormatUtils.vndPrice(vat)}
              </Text>
            </div>
            <Divider style={{ borderColor: '#ccc' }} />
            <div style={{ marginBottom: 16 }}>
              <Text style={{ color: 'white' }}>Tổng cộng:</Text>
              <Text strong style={{ float: 'right', fontSize: 16, color: '#00ffcc' }}>
                {FormatUtils.vndPrice(grandTotal)}
              </Text>
            </div>
            <Button
              type="primary"
              block
              disabled={cartItems.length === 0}
              onClick={() => alert('Đặt hàng thành công!')}
              style={{ backgroundColor: '#13c2c2', borderColor: '#13c2c2' }}
            >
              Thanh toán
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
