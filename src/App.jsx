import React from 'react';
import { Button, Form, Input, Space } from 'antd';

function App() {
  const onFinish = () => {
    console.log("Submited")
  }

  const onFinishFailed = () => {
    console.log("Failed submition")
  }

  return (
    <Form
      name="basic"
      style={{ maxWidth: 400 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      size="large"
    >

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" size="large" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default App;
