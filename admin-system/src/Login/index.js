import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import CryptoJS from "crypto-js";
import './index.css'
const key = CryptoJS.enc.Utf8.parse("hPF36*nC&b0yIDNz");
const iv = CryptoJS.enc.Utf8.parse('25sXG$HdoDjNj*J!');

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password:window.password,
      username:window.username,
      remember:true
    }
  }

  onFinish = () => {
    fetch("http://30a3e94429.zicp.vip/auth", {
      method: "POST",
      header: new Headers({
        "Content-Type": "application/json;charset=UTF-8",
      }),   
      body:JSON.stringify({
        username:this.state.username,
        password:this.state.password
      })
    }).then((response) => response.json()
    ).then((result) => {
      if (result.code >= 200 || result.code < 300) {
        console.log("登录成功")
        // 二、思考：API连接成功后，要保持页面刷新后仍保留原本信息，而不是返回登录页面。
        //1、保留原先登录信息即cookie本地存储的使用。js本地存储有cookie和store。
        // 1.1、加载名为cookieName的cookie信息,cookie.load(cookieName)
        cookie.load()
        //1.2、判断是否勾选了记住密码选项，如果是则cooike保存密码，用户名，角色,token等信息
        if (this.state.remember === true) {
          cookie.save({
            username: this.state.username,
            password: this.state.password,
            role: result?.data?.role,
            token: result?.data?.token
          })
        }
        //如果未勾选，则清除密码，保存用户名和其他信息
        else {
          cookie.remove(['password'])
          cookie.save({
            username: this.state.username,
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

  handleCheck=(event)=>{
    this.setState({
      remeber:event.target.checked
    })
  }
  //为密码加密

  handleChange=(e)=>{
    cookie.load(['username','password','role','token'])
    if (cookie.password ===this.state.password && cookie.password!==undefined) {
      this.setState({
        password:this.Encrypt(this.state.password)
      })
    } else{
      this.setState({
        password:this.Encrypt(e.target.value)
      })
    }
  }

  Encrypt(word) {
    if (word) {
      let srcs = CryptoJS.enc.Utf8.parse(word);
      let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.ciphertext.toString().toUpperCase();
    }
  }

  Decrypt(word) {
    if (word) {
      let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
      let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      let decrypt = CryptoJS.AES.decrypt(srcs, key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
      let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
      return decryptedStr.toString();
    }
  }

  componentDidCatch(){
    if (cookie.token) {
      this.props.history.push("/mainMenu")
    }
  }

  render() {

    //form表单校验方法1、使用validatemessages属性统一校验，先定义类型，再设置校验属性，属性值以及提示信息
    //具体属性和属性值参考antd的validateMessages属性对应的GitHub上的代码
    // const validateMessages = {
    //   string: {
    //     range: "${name} 必须在 ${min} 到 ${max} 之间",
    //   },
    // }

    return (
      <div className="login">
        <div className="loginForm">
          {/* 给Form绑定initialValues属性，初始化表单的属性值。
          然后绑定onFinish提交表单且数据验证成功后回调事件*/}
          <Form className="login-form" 
          initialValues={{
            remember:true,
            username:this.state.username,
            password:this.Encrypt(this.state.password)
          }} 
          onFinish={this.onFinish}>
            <Form.Item
              name="username"
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
              rules={[
                {
                  required: true,
                  message: '请输入你的密码！',
                },
                // {
                //   type: 'string',
                //   min: 2,
                //   max: 10,
                // }
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
                type="password"
                onChange={(e)=>this.handleChange(e)}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
              checked={this.state.remember}
              onChange={(e)=>this.handleCheck(e)}>
                记住密码
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}