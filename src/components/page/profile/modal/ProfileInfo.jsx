import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Descriptions,
  Divider,
  Tag,
  Button,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "@/global/AuthContext";
import EditProfileModal from "./EditProfileModal";

const { Title, Text } = Typography;

const ProfileInfo = () => {
  const { user, setUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const handleUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      window.messageApi?.error("Chỉ hỗ trợ định dạng ảnh.");
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      const updatedUser = { ...user, avatar: base64 };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      window.messageApi?.success("Đổi ảnh thành công!");
    };

    reader.readAsDataURL(file);
    return false;
  };

  return (
    <>
      <Card className="profile-card">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm={8} className="profile-avatar-col">
            <Avatar
              size={120}
              src={user?.avatar}
              icon={
                !user?.avatar && <Text>{user?.name?.[0]?.toUpperCase()}</Text>
              }
              className="profile-avatar"
            />
            <Title level={4}>{user?.name}</Title>
            {user?.role && (
              <Tag className="profile-role-tag">{user.role.toUpperCase()}</Tag>
            )}
            <Upload
              showUploadList={false}
              beforeUpload={handleUpload}
              accept="image/*"
            >
              <Button
                icon={<UploadOutlined />}
                size="small"
                className="upload-btn"
              >
                Đổi ảnh
              </Button>
            </Upload>
          </Col>

          <Col xs={24} sm={16}>
            <Divider orientation="left">Thông tin chi tiết</Divider>
            <Descriptions
              column={1}
              size="small"
              className="profile-descriptions"
            >
              <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {user?.phone || "Chưa cập nhật"}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {user?.address || "Chưa cập nhật"}
              </Descriptions.Item>
              <Descriptions.Item label="Giới tính">
                {user?.gender || "Không rõ"}
              </Descriptions.Item>
            </Descriptions>

            <div className="edit-btn-wrapper">
              <Button type="primary" onClick={() => setModalOpen(true)}>
                Cập nhật thông tin
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      <EditProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={{ ...user }}
      />
    </>
  );
};

export default ProfileInfo;
