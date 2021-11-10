import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import './index.css'
import mainMenu from "../MainMenu";

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  //一、使用fetch异步向后台请求数据的方法和步骤。
  //1、此处使用的是表单的非受控组件，React.createRef()，创建formRef对象绑定到form表单
  formRef = React.createRef();

  handleSumit = () => {
    //2、抓取登录表单输入的值，使用formData数组存储getFieldsValue获取到对应字段名的值
    const formData = this.formRef.current.getFieldsValue([
      'username', 'password', 'remember'
    ])
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

        // 二、思考：API连接成功后，要保持页面刷新后仍保留原本信息，而不是返回登录页面。
        //1、保留原先登录信息即cookie本地存储的使用。js本地存储有cookie和store。
        // 1.1、加载名为cookieName的cookie信息,cookie.load(cookieName)
        cookie.load()
        //1.2、判断是否勾选了记住密码选项，如果是则cooike保存密码，用户名，角色,token等信息
        if (formData.remeber === true) {
          cookie.save({
            username: formData.username,
            password: formData.password,
            role: result?.data?.role,
            token: result?.data?.token
          })
        }
        //如果未勾选，则清除密码，保存用户名和其他信息
        else {
          cookie.remove(['password'])
          cookie.save({
            username: formData.username,
            role: result?.data?.role,
            token: result?.data?.token
          })
        }
        // 当一个路由点击多次，将会出现警告，使用replace，这样会替换历史记录中上一次相同路由记录，
        // 而push会添加新的相同记录进去，hash路由会有这个问题，Browser形式的则不会
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

  //为密码加密
  handleChangePassword = (e) => {
    console.log("密码", e);
  }

  render() {

    //form表单校验方法1、使用validatemessages属性统一校验，先定义类型，再设置校验属性，属性值以及提示信息
    //具体属性和属性值参考antd的validateMessages属性对应的GitHub上的代码
    const validateMessages = {
      string: {
        range: "${label} 必须在 ${min} 到 ${max} 之间",
      },
    }

    return (
      <div className="login">
        <div className="loginForm">
          {/* 给Form绑定ref属性，这样可以保证form表单变化在任何时间总是拿到正确的实例。*/}
          <Form className="login-form" ref={this.formRef} validateMessages={validateMessages}>
            <Form.Item
              name="username"
              label="账号"
              //约束规则，rules
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
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请输入你的密码！',
                },
                {
                  type: 'string',
                  min: 2,
                  max: 10,
                }
                //form表单校验方法2、逐个添加校验属性和属性值
                // {
                //   min: 4,
                //   message: '密码必须不小于4位！',
                // },
                // {
                //   max: 12,
                //   message: '密码必须不大于12位！',
                // },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox onChange={this.handleChangePassword} >
                记住密码
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={this.handleSumit} >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Link to="/mainMenu">用户</Link>
      </div>
    )
  }
}