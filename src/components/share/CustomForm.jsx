import React from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";

const { Option } = Select;

const CustomForm = ({
  fields,
  onFinish,
  loading,
  submitText = "Submit",
  initialValues,
}) => {
  const renderField = (field) => {
    const { type = "text", label, placeholder, options } = field;

    switch (type) {
      case "password":
        return <Input.Password placeholder={placeholder || label} />;
      case "select":
        return (
          <Select placeholder={placeholder || `Chọn ${label.toLowerCase()}`}>
            {options?.map(({ label, value }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        );
      case "textarea":
        return (
          <Input.TextArea
            placeholder={placeholder || label}
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        );
      case "checkbox":
        return <Checkbox>{label}</Checkbox>;
      default:
        return <Input type={type} placeholder={placeholder || label} />;
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      scrollToFirstError
    >
      {fields.map((field) => {
        const isCheckbox = field.type === "checkbox";
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={!isCheckbox ? field.label : undefined}
            valuePropName={isCheckbox ? "checked" : "value"}
            rules={field.rules}
          >
            {renderField(field)}
          </Form.Item>
        );
      })}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
