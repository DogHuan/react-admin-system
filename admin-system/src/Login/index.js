import React, { Component, createElement } from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css'
export default class Login extends Component {
  constructor(props) {
    super(props)
  }
  //此处使用的是表单的非受控组件，React.createRef()
  formRef = React.createRef();
  handleSumit = () => {
    const formData = this.formRef.current.getFieldsValue([
      'username', 'password',
    ])
    console.log("value", formData)
  }
  render() {
    return (
      <div className="login">
        <div className="loginForm">
          <Form className="login-form" ref={this.formRef}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入你的用户名或账号！',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名或账号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入你的密码！',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Form.Item style={{
              paddingTop: 20
            }}>
              <Button type="primary" htmlType="submit" onClick={this.handleSumit} >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}