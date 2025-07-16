import React from "react";
import {
  Row,
  Col,
  Card,
  List,
  Image,
  Typography,
  InputNumber,
  Spin,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import FormatUtils from "@/ulti/Format";
import useCartPage from "../hook/useCartPage";
import CheckoutSummary from "@/components/share/CheckoutSummary";
import "@/styles/cart.style.scss";

const { Title, Text } = Typography;

const CartPage = () => {
  const {
    cartItems,
    handleRemove,
    handleQuantityChange,
    total,
    vat,
    grandTotal,
    loading,
  } = useCartPage();

  return (
    <div className="cart-page">
      <Title className="title-cart" level={2}>
        Giỏ hàng của tôi
      </Title>
      <Spin spinning={loading}>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={16}>
            <Card title="Sản phẩm đã chọn" className="cart-card">
              {cartItems.length === 0 ? (
                <Text>Không có sản phẩm nào trong giỏ hàng.</Text>
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={cartItems}
                  renderItem={(item) => (
                    <List.Item
                      className="cart-list-item"
                      actions={[
                        <DeleteOutlined
                          key="delete"
                          style={{ color: "red" }}
                          onClick={() => handleRemove(item.id)}
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Image src={item.image} width={80} />}
                        title={item.name}
                        description={
                          <div className="cart-desc">
                            <Text type="secondary">{item.shortDesc}</Text>
                            <br />
                            <Text>Số lượng: </Text>
                            <InputNumber
                              min={1}
                              value={item.quantity}
                              onChange={(val) =>
                                handleQuantityChange(item.id, val)
                              }
                            />
                            <br />
                            <strong>
                              {FormatUtils.vndPrice(item.price * item.quantity)}
                            </strong>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <div className="checkout-cart">
              <CheckoutSummary
                total={total}
                vat={vat}
                grandTotal={grandTotal}
                disabled={cartItems.length === 0}
                onCheckout={() => alert("Đặt hàng thành công!")}
              />
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default CartPage;
