// src/components/CustomForm.jsx
import React from 'react';
import { Form, Input, Button } from 'antd';

const CustomForm = ({ fields, onFinish, loading, submitText = 'Submit' }) => {
  return (
    <Form layout="vertical" onFinish={onFinish}>
      {fields.map(({ name, label, rules, type = 'text', placeholder }) => (
        <Form.Item key={name} name={name} label={label} rules={rules}>
          {type === 'password' ? (
            <Input.Password placeholder={placeholder || label} />
          ) : (
            <Input type={type} placeholder={placeholder || label} />
          )}
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
