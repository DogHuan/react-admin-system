import React, { Component } from "react";
import { Form, Input, Button, Select, Checkbox } from 'antd';
import './index.css'
export default class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="login">
        <div className="loginForm">
          <p style={{ textAlign: "center"}}>登录页面</p>
          <Form name="login-hooks"
            style={{
              margin:"auto",
              width:"30%"
            }}
            >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" style={{
              marginLeft:20
            }}>
              <Checkbox >
                记住密码</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button htmlType="button"
                style={{
                  marginRight: 20
                }}>
                重置</Button>
              <Button type='primary' htmlType="submit">
                登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}