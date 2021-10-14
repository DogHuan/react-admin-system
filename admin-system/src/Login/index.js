import React, { Component } from "react";
import { Form, Input, Button, Select } from 'antd';
// import './index.css'
export default class Login extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="login">
        <div className="loginForm">
         <p>登录页面</p>
          <Form name="control-hooks" >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
              <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
              </Form.Item>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}