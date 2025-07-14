import React from "react";
import { Modal } from "antd";
import { useAuth } from "@/global/AuthContext";
import CustomForm from "@/components/share/CustomForm";

const EditProfileModal = ({ open, onClose, initialValues }) => {
  const { user, setUser } = useAuth();

  const fields = [
    { name: "phone", label: "Số điện thoại" },
    { name: "address", label: "Địa chỉ" },
    {
      name: "gender",
      label: "Giới tính",
      type: "select",
      options: [
        { label: "Nam", value: "male" },
        { label: "Nữ", value: "female" },
        { label: "Khác", value: "other" },
      ],
    },
  ];

  const handleFinish = (values) => {
    console.log(values);
    const updatedUser = { ...user, ...values, avatar: user?.avatar };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    window.messageApi?.success("Cập nhật thành công!");
    onClose();
  };

  return (
    <Modal
      title="Cập nhật thông tin cá nhân"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <CustomForm
        fields={fields}
        initialValues={initialValues}
        onFinish={handleFinish}
        loading={false}
        submitText="Lưu thay đổi"
      />
    </Modal>
  );
};

export default EditProfileModal;
