import React from "react";
import { Card, Typography, Divider, Button } from "antd";
import FormatUtils from "@/ulti/Format";

const { Text } = Typography;

const CheckoutSummary = ({
  total = 0,
  vat = 0,
  grandTotal = 0,
  disabled = false,
  onCheckout,
}) => {
  return (
    <Card title="Thanh toán" variant="outlined" className="checkout-card">
      <div className="summary-row">
        <Text>Tạm tính:</Text>
        <Text strong>{FormatUtils.vndPrice(total)}</Text>
      </div>
      <div className="summary-row">
        <Text>VAT (10%):</Text>
        <Text strong>{FormatUtils.vndPrice(vat)}</Text>
      </div>
      <Divider />
      <div className="summary-row">
        <Text>Tổng cộng:</Text>
        <Text strong className="grand-total">
          {FormatUtils.vndPrice(grandTotal)}
        </Text>
      </div>
      <Button
        type="primary"
        block
        disabled={disabled}
        onClick={onCheckout}
        className="checkout-btn"
      >
        Thanh toán
      </Button>
    </Card>
  );
};

export default CheckoutSummary;
