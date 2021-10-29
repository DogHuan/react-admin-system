import React, { Component } from "react";
import { Route, Switch, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import './index.css'
import mainMenu from "../MainMenu";
export default class Login extends Component {
  constructor(props) {
    super(props)
  }
  
  //一、使用fetch异步向后台请求数据的方法以及步骤
  //1、此处使用的是表单的非受控组件，React.createRef()
  formRef = React.createRef();

  handleSumit = () => {
    //2、抓取登录表单输入的值，使用formData数组存储参数
    const formData = this.formRef.current.getFieldsValue([
      'username', 'password','remember'
    ])
    console.log("value", formData)
    //3、fetch()异步请求方法的步骤
    //3.1、url请求地址 3.2、method请求方法：POST, GET, OPTIONS, PUT, DELETE, UPDATE
    //3.3、header请求头(请求头格式需要分情况设置) 3.4、body请求体(这里使用JSON格式发送数据)
    fetch("url", {
      method: "POST",
      header: new Headers({
        "Content-Type": "application/json;charset=UTF-8",
      }),
      //3.4.1、直接传送formData数组给后端
      body: JSON.stringify(formData)
      //3.4.2、分别设置formData内部的值
      // body:JSON.stringify({
      //   username:formData.username,
      //   password:formData.password
      // })
      //4、.then对请求结果的处理步骤以及方法
      //4.1、对响应体response也进行转json的.json()处理
    }).then((response) => response.json()
    ).then((result) => {
      //4.2、判断请求结果的msg
      // if(result.msg==='ok')
      //4.3、判断请求结果的code值
      if (result.code >= 200 || result.code < 300) {
        console.log("登录成功")
  // 二、我们对请求方法判断连接成功后，我们就需要考虑角色的匹配和信息的存储即引入cookie。
      //1、我们需要对输入的用户名和密码所对应角色进行判断，并且使用cookie去存储这些信息。
      // 1.1、加载名为cookieName的cookie信息,cookie.load(cookieName)
        cookie.load()
        //1.2、判断是否勾选了记住密码选项，如果是则cooike保存密码，用户名，角色等信息
        if(formData.remeber === true){
          cookie.save({
            username:formData.username,
            password:formData.password,
            role:result?.data?.role
          })
          console.log("cookie1",cookie);
        }
        //如果未勾选，则清除密码，保存用户名和其他信息
        else{
          cookie.remove(['password'])
          cookie.save({
            username:formData.username,
            role:result?.data?.role
          })
          console.log("cookie2",cookie);
        }
        this.props.history.replace("/mainMenu")
      }
      //4.4、对错误异常的处理
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
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox 
                onChange={this.handleChangePassword} >
                记住密码</Checkbox>
            </Form.Item>
            <Form.Item style={{
              paddingTop: 20
            }}>
              <Button type="primary" htmlType="submit" onClick={this.handleSumit} >
                登录
              </Button>
            </Form.Item>
          </Form>
          <Link to="/mainMenu">用户管理</Link>
        </div>
      </div>
    )
  }
}