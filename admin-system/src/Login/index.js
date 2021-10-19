import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from 'antd';
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
    //抓取登录表单输入的值，使用fetch()方法传递给后端
    //1、url请求地址 2、method请求方法 
    //3、header请求头(请求头格式需要分情况设置) 4、body请求体(这里使用JSON格式发送数据)
    fetch("url", {
      method: "POST",
      header: new Headers({
        "Content-Type": "application/json;charset=UTF-8",
      }),
      //1.直接传送formData数组给后端
      body: JSON.stringify(formData)
      //2.分别设置formData内部的值
      // body:JSON.stringify({
      //   username:formData.username,
      //   password:formData.password
      // })
    }).then((response) => response.json()
    ).then((result) => {
      //1.判断请求结果的msg
      // if(result.msg==='ok')
      //2.判断请求结果的code值
      if (result.code >= 200 || result.code < 300) {
        console.log("登录成功")
      }
      //3.对错误异常的处理
      else {
        message.error("登录失败" + result.msg)
      }
    }).catch(function (error) {
      message.error("登录失败" + error)
    })
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
              <Input prefix={<UserOutlined />}
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
          <Button type="primary" htmlType="submit" onClick={this.handleUser} >
            用户
          </Button>
          <Button type="primary" htmlType="submit" onClick={this.handleCommod} >
            商品
          </Button>
        </div>
      </div>
    )
  }
}