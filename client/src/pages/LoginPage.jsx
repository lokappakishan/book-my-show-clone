/* LoginPage.jsx */
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const onFinish = async (values) => {
  console.log('Success:', values);
  try {
    const response = await axiosInstance.post('/user/login', values);
    console.log('Login Success:', response);
  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginPage = () => (
  <div
    style={{ maxWidth: 400, margin: 'auto', padding: 20, textAlign: 'center' }}
  >
    <h2>Login</h2>
    <Form
      name="login"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form.Item>
    </Form>
    <p>
      Don't have an account? <Link to="/register">Register here</Link>
    </p>
  </div>
);

export default LoginPage;
