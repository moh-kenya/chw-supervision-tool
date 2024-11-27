import React from 'react';
import { Form, Input, Button } from 'antd';

const MyForm = () => {
  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      const response = await account.createEmailSession(username, password);
      console.log('Login successful:', response);

    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
