import React from "react";
import { Result, Button } from "antd";
import { ToolOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MaintenancePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        icon={<ToolOutlined style={{ fontSize: 64, color: "#faad14" }} />}
        title="Trang đang được bảo trì"
        subTitle="Chúng tôi đang nâng cấp hệ thống để phục vụ bạn tốt hơn. Vui lòng quay lại sau."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Quay lại trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default MaintenancePage;
